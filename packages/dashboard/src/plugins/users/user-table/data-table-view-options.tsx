"use client";

import type { Table } from "@tanstack/react-table";
import { useDashboard } from "../../../dashboard";

export type DataTableViewOptionsProps<TData> = {
    table: Table<TData>;
}

export const DataTableViewOptions = <TData,>({ table }: DataTableViewOptionsProps<TData>) => {
    const { components, icons, t } = useDashboard();
    const { DropdownMenu, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, Button } = components;
    const { Settings2 } = icons;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                    <Settings2 />
                    {t("users.table.toolbar.view")}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[150px]">
                <DropdownMenuLabel className="text-xs">
                    {t("users.table.toolbar.view.label")}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table.getAllColumns().filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide()).map((column) => {
                    return (
                        <DropdownMenuCheckboxItem key={column.id} checked={column.getIsVisible()} onSelect={(e) => e.preventDefault()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                            {(column.columnDef.meta as any)?.displayName ?? column.id}
                        </DropdownMenuCheckboxItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
};
DataTableViewOptions.displayName = "DataTableViewOptions";