"use client";

import type { Table } from "@tanstack/react-table";
import { useDashboard } from "../../dashboard";
import { DataTableViewOptions } from "./data-table-view-options";
import { LoaderIcon } from "../loader-icon";

export type DataTableToolbarProps<TData> = {
	table: Table<TData>;
	children?: React.ReactNode;
	isLoading?: boolean;
	searchPlaceholder?: string;
};

export const DataTableToolbar = <TData,>({
	table,
	isLoading,
	children,
	searchPlaceholder,
}: DataTableToolbarProps<TData>) => {
	const { components, icons, t } = useDashboard();
	const { Input, Button } = components;
	const { X, ListFilter } = icons;
	const isFiltered = table.getState().columnFilters.length > 0;

	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center flex-1 gap-x-2">
				<div className="relative w-[150px] lg:w-[250px]">
					<Input
						placeholder={searchPlaceholder}
						autoComplete="off"
						type="text"
						value={table.getState().globalFilter ?? ""}
						onChange={(e) => table.setGlobalFilter(e.target.value)}
						className="peer ps-9 h-8"
					/>
					<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
						{isLoading ? (
							<LoaderIcon />
						) : (
							<ListFilter className="size-4" aria-hidden="true" />
						)}
					</div>
				</div>
				{children}
				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => {
							table.resetColumnFilters();
							table.resetGlobalFilter();
						}}
						className="h-8 px-2 lg:px-3"
					>
						{t("ui.dataTable.toolbar.reset")}
						<X />
					</Button>
				)}
			</div>
			<DataTableViewOptions table={table} />
		</div>
	);
};
