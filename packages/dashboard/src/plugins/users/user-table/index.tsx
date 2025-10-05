"use client";

import {
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { useDashboard, useDashboardPage } from "../../../dashboard";
import { useUsers } from "../users-provider";
import {
	DataTable,
	DataTablePagination,
	DataTableFacetedFilter,
	DataTableToolbar,
} from "../../../ui/data-table";
import { sortAdminRolesFn } from "../../../utils/sort-admin-roles";

export const UserTable = () => {
	const {
		icons: { Tag },
		components,
		t,
		source,
	} = useDashboard();
	const { session } = useDashboardPage();
	const {
		loading,
		data,
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
			<DataTableToolbar
				table={table}
				isLoading={loading}
				searchPlaceholder={t("users.table.toolbar.search")}
			>
				{table.getColumn("role") && (
					<DataTableFacetedFilter
						column={table.getColumn("role")}
						title={t("users.table.toolbar.facetedFilter.role.label")}
						options={Object.entries(source.roles)
							.sort(sortAdminRolesFn())
							.map(([role, config]) => ({
								value: role,
								icon: config.icon ?? Tag,
								label: t("roleName", {
									role,
								}),
							}))}
					/>
				)}
			</DataTableToolbar>
			<DataTable table={table} />
			<DataTablePagination table={table} />
		</div>
	);
};
UserTable.displayName = "UserTable";
