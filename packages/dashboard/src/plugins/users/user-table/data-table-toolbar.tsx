"use client";

import type { Table } from "@tanstack/react-table";
import { useDashboard } from "../../../dashboard";
import type { UserWithRole } from "better-auth/plugins/admin";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { sortAdminRolesFn } from "../../../utils/sort-admin-roles";

export type DataTableToolbarProps = {
	table: Table<UserWithRole>;
	onSearch?: (value: string) => void;
};

export const DataTableToolbar = ({
	table,
	onSearch,
}: DataTableToolbarProps) => {
	const { components, icons, source, t } = useDashboard();
	const { Input, Button } = components;
	const { X, Tag, ListFilter } = icons;
	const isFiltered = table.getState().columnFilters.length > 0;

	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center flex-1 gap-x-2">
				<div className="relative w-[150px] lg:w-[250px]">
					<Input
						placeholder={t("users.table.toolbar.search")}
						autoComplete="off"
						type="text"
						className="peer ps-9 h-8"
					/>
					<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
						<ListFilter className="size-4" aria-hidden="true" />
					</div>
				</div>
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
				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => {
							table.resetColumnFilters();
						}}
						className="h-8 px-2 lg:px-3"
					>
						{t("users.table.toolbar.reset")}
						<X />
					</Button>
				)}
			</div>
			<DataTableViewOptions table={table} />
		</div>
	);
};
