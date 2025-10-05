"use client";

import { flexRender, type Table } from "@tanstack/react-table";
import { useDashboard } from "../../dashboard";

export type DataTableProps<TData> = {
	table: Table<TData>;
};

export const DataTable = <TData,>({ table }: DataTableProps<TData>) => {
	const {
		t,
		icons: { ChevronDown, ChevronUp },
		components: {
			Table,
			TableBody,
			TableCell,
			TableHead,
			TableHeader,
			TableRow,
		},
	} = useDashboard();
	const columns = table._getColumnDefs();

	return (
		<div className="bg-background overflow-hidden rounded-md border">
			<Table className="table-fixed">
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id} className="hover:bg-transparent">
							{headerGroup.headers.map((header) => {
								return (
									<TableHead
										key={header.id}
										style={{ width: `${header.getSize()}px` }}
										className="h-11"
									>
										{header.isPlaceholder ? null : header.column.getCanSort() ? (
											<div
												className={
													header.column.getCanSort()
														? "flex h-full cursor-pointer items-center justify-between gap-2 select-none"
														: undefined
												}
												onClick={header.column.getToggleSortingHandler()}
												onKeyDown={(e) => {
													// Enhanced keyboard handling for sorting
													if (
														header.column.getCanSort() &&
														(e.key === "Enter" || e.key === " ")
													) {
														e.preventDefault();
														header.column.getToggleSortingHandler()?.(e);
													}
												}}
												tabIndex={header.column.getCanSort() ? 0 : undefined}
											>
												{flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
												{{
													asc: (
														<ChevronUp
															className="shrink-0 opacity-60 size-4"
															aria-hidden="true"
														/>
													),
													desc: (
														<ChevronDown
															className="shrink-0 opacity-60 size-4"
															aria-hidden="true"
														/>
													),
												}[header.column.getIsSorted() as string] ?? null}
											</div>
										) : (
											flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)
										)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id} className="last:py-0">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								{t("ui.dataTable.noResults")}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
};
DataTable.displayName = "DataTable";
