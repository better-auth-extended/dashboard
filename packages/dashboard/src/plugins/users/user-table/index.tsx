"use client";

import {
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { useDashboard, useDashboardPage } from "../../../dashboard";
import { DataTable } from "./data-table";
import { DataTableToolbar } from "./data-table-toolbar";
import { useUsers } from "../users-provider";
import { DataTablePagination } from "./data-table-pagination";

export const UserTable = () => {
	const { components, t } = useDashboard();
	const { session } = useDashboardPage();
	const {
		data,
		setData,
		pagination,
		setPagination,
		globalFilter,
		setGlobalFilter,
		sorting,
		setSorting,
		columnFilters,
		setColumnFilters,
	} = useUsers();

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
