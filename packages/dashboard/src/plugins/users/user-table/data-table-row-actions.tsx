"use client";

import type { Row } from "@tanstack/react-table";
import { useDashboard } from "../../../dashboard";
import type { UserWithRole } from "better-auth/plugins/admin";
import { useUsers } from "../users-provider";

export type DataTableRowActionsProps = {
	row: Row<UserWithRole>;
};

export const DataTableRowActions = ({ row }: DataTableRowActionsProps) => {
	const { components, icons, t } = useDashboard();
	const {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuSeparator,
		DropdownMenuTrigger,
		Button,
	} = components;
	const { Ellipsis, Pencil, HatGlasses, ShieldBan, ShieldOff, Trash } = icons;

	const { setCurrentRow, setOpen } = useUsers();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="size-7"
					aria-label={t("ui.openMenu.aria-label")}
				>
					<Ellipsis />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="min-w-[160px]">
				<DropdownMenuItem
					// TODO: disabled={!row.getCanSelect()}
					onClick={() => {
						setCurrentRow(row.original);
						setOpen("edit");
					}}
				>
					<Pencil />
					{t("users.table.actions.edit")}
				</DropdownMenuItem>

				<DropdownMenuItem disabled={!row.getCanSelect()}>
					<HatGlasses />
					{t("users.table.actions.impersonate")}
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem disabled={!row.getCanSelect()}>
					{!row.original.banned ? (
						<>
							<ShieldBan />
							{t("users.table.actions.ban")}
						</>
					) : (
						<>
							<ShieldOff />
							{t("users.table.actions.unban")}
						</>
					)}
				</DropdownMenuItem>
				<DropdownMenuItem disabled={!row.getCanSelect()}>
					<Trash />
					{t("users.table.actions.removeUser")}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
DataTableRowActions.displayName = "DataTableRowActions";
