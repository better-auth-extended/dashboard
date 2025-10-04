"use client";

import {
	type ColumnFiltersState,
	getCoreRowModel,
	getPaginationRowModel,
	type PaginationState,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { useDashboard, useDashboardPage } from "../../../dashboard";
import { DataTable } from "./data-table";
import { useCallback, useEffect, useState, useTransition } from "react";
import { DataTableToolbar } from "./data-table-toolbar";
import { useUsers } from "../users-provider";
import { useDebounceCallback } from "../../../hooks/use-debounce-callback";
import { DataTablePagination } from "./data-table-pagination";

export const UserTable = () => {
	const { authClient, components, t } = useDashboard();
	const { session } = useDashboardPage();
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 20,
	});
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [loading, startTransition] = useTransition();
	const { data, setData } = useUsers();

	const fetchUsers = useCallback(
		({
			pageIndex,
			pageSize,
			globalFilter,
			sorting,
			columnFilters,
		}: {
			pageIndex: number;
			pageSize: number;
			globalFilter: string;
			sorting: SortingState;
			columnFilters: ColumnFiltersState;
		}) =>
			startTransition(async () => {
				const activeFilter = columnFilters[0];

				const result = await authClient.admin.listUsers({
					query: {
						searchValue: globalFilter?.trim().toLowerCase(),
						limit: pageSize,
						offset: pageIndex * pageSize,
						sortBy: sorting[0]?.id,
						sortDirection: sorting[0]?.desc ? "desc" : "asc",
						// TODO:
						// filterOperator: ,
						// filterField: activeFilter?.id,
						// filterValue: activeFilter?.value,
					},
				});

				if (result.data?.users) {
					setData(result.data);
				}
			}),
		[authClient, setData],
	);
	const debouncedFetch = useDebounceCallback(fetchUsers, 400);

	useEffect(() => {
		debouncedFetch({
			pageIndex: pagination.pageIndex,
			pageSize: pagination.pageSize,
			globalFilter,
			sorting,
			columnFilters,
		});
	}, [pagination, sorting, columnFilters, globalFilter]);

	const table = useReactTable({
		data: data.users,
		columns: columns({
			components,
			t,
		}),
		state: {
			pagination,
			globalFilter,
			sorting,
			columnFilters,
		},
		manualPagination: true,
		manualSorting: true,
		manualFiltering: true,
		pageCount: Math.ceil(data.total / pagination.pageSize),
		enableRowSelection: (row) => row.original.id !== session.user.id,
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		onGlobalFilterChange: setGlobalFilter,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<div className="space-y-4">
			<DataTableToolbar table={table} />
			<DataTable table={table} />
			<DataTablePagination table={table} />
		</div>
	);
};
UserTable.displayName = "UserTable";
