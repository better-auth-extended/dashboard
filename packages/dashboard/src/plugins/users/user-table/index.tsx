"use client";

import {
	getCoreRowModel,
	getPaginationRowModel,
	type PaginationState,
	useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { useDashboard, useDashboardPage } from "../../../dashboard";
import { DataTable } from "./data-table";
import {
	useCallback,
	useEffect,
	useMemo,
	useState,
	useTransition,
} from "react";
import { DataTableToolbar } from "./data-table-toolbar";
import { useUsers } from "../users-provider";

export const UserTable = () => {
	const { authClient, components, t } = useDashboard();
	const { session } = useDashboardPage();
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 20,
	});
	const [loading, startTransition] = useTransition();
	const [searchValue, setSearchValue] = useState("");
	const { data, setData } = useUsers();

	const fetchUsers = useCallback(
		(query: { pageIndex: number; pageSize: number; searchValue?: string }) =>
			startTransition(async () => {
				const result = await authClient.admin.listUsers({
					query: {
						limit: query.pageSize,
						offset: query.pageSize * query.pageIndex,
						searchValue:
							query.searchValue && query.searchValue.trim().length > 0
								? query.searchValue
								: searchValue.trim().length > 0
									? searchValue
									: undefined,
					},
				});

				if (result.data?.users) {
					setData(result.data);
				}
			}),
		[authClient],
	);

	const safePagination = useMemo(
		() => pagination,
		[JSON.stringify(pagination)],
	);

	useEffect(() => {
		fetchUsers({
			...safePagination,
			searchValue: undefined,
		});
	}, [safePagination]);

	const table = useReactTable({
		data: data.users,
		columns: columns({
			components,
			t,
		}),
		state: {
			pagination,
		},
		enableRowSelection: (row) => row.original.id !== session.user.id,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<div className="space-y-4">
			<DataTableToolbar table={table} />
			<DataTable table={table} />
		</div>
	);
};
UserTable.displayName = "UserTable";
