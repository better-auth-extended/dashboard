"use client";

import type { Table } from "@tanstack/react-table";
import { cn } from "../../utils/cn";
import { getPageNumbers } from "../../utils/get-page-numbers";
import { useDashboard } from "../../dashboard";

export type DataTablePaginationProps<TData> = {
	table: Table<TData>;
};

export const DataTablePagination = <TData,>({
	table,
}: DataTablePaginationProps<TData>) => {
	const currentPage = table.getState().pagination.pageIndex + 1;
	const totalPages = table.getPageCount();
	const pageNumbers = getPageNumbers(currentPage, totalPages);
	const {
		t,
		icons: { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight },
		components: {
			Select,
			SelectTrigger,
			SelectValue,
			SelectContent,
			SelectItem,
			Button,
		},
	} = useDashboard();

	return (
		<div
			className={cn(
				"flex items-center justify-between",
				"@max-2xl/container:flex-col-reverse @max-2xl/container:gap-4",
			)}
			style={{ overflowClipMargin: 1 }}
		>
			<div className="flex w-full items-center">
				<div className="flex w-[100px] items-center justify-center text-sm font-medium @3xl/content:hidden">
					{t("ui.dataTable.pagination.pageIndicator", {
						currentPage,
						totalPages,
					})}
				</div>
				<div className="flex items-center gap-2 @max-2xl/container:flex-row-reverse">
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={(value) => {
							table.setPageSize(Number(value));
						}}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent side="top">
							{[10, 20, 30, 40, 50].map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<p className="hidden text-sm font-medium sm:block">
						{t("ui.dataTable.pagination.itemsPerPage")}
					</p>
				</div>
			</div>

			<div className="flex items-center sm:space-x-6 lg:space-x-8">
				<div className="flex w-[100px] items-center justify-center text-sm font-medium @max-3xl/content:hidden">
					{t("ui.dataTable.pagination.pageIndicator", {
						currentPage,
						totalPages,
					})}
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						className="size-8 p-0 @max-md/content:hidden"
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
						aria-label={t("ui.dataTable.pagination.goToFirstPage.aria-label")}
					>
						<ChevronsLeft className="size-4" />
					</Button>
					<Button
						variant="outline"
						className="size-8 p-0"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						aria-label={t(
							"ui.dataTable.pagination.goToPreviousPage.aria-label",
						)}
					>
						<ChevronLeft className="size-4" />
					</Button>

					{/* Page number buttons */}
					{pageNumbers.map((pageNumber, index) => (
						<div key={`${pageNumber}-${index}`} className="flex items-center">
							{pageNumber === "..." ? (
								<span className="text-muted-foreground px-1 text-sm">...</span>
							) : (
								<Button
									variant={currentPage === pageNumber ? "default" : "outline"}
									className="h-8 min-w-8 px-2"
									onClick={() => table.setPageIndex((pageNumber as number) - 1)}
									aria-label={t("ui.dataTable.pagination.goToPage.aria-label", {
										pageNumber,
									})}
								>
									{pageNumber}
								</Button>
							)}
						</div>
					))}

					<Button
						variant="outline"
						className="size-8 p-0"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						aria-label={t("ui.dataTable.pagination.goToNextPage.aria-label")}
					>
						<ChevronRight className="size-4" />
					</Button>
					<Button
						variant="outline"
						className="size-8 p-0 @max-md/content:hidden"
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
						aria-label={t("ui.dataTable.pagination.goToLastPage.aria-label")}
					>
						<ChevronsRight className="size-4" />
					</Button>
				</div>
			</div>
		</div>
	);
};
DataTablePagination.displayName = "DataTablePagination";
