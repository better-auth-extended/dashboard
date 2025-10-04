"use client";

import type { Row } from "@tanstack/react-table";
import { useDashboard } from "../../../dashboard";
import type { UserWithRole } from "better-auth/plugins/admin";
import { useUsers } from "../users-provider";
import { sortAdminRolesFn } from "../../../utils/sort-admin-roles";
import { useState } from "react";
import { cn } from "../../../utils/cn";

export type DataTableRowActionsProps = {
	row: Row<UserWithRole>;
};

export const DataTableRowActions = ({ row }: DataTableRowActionsProps) => {
	const {
		t,
		icons: { Ellipsis, Pencil, HatGlasses, ShieldBan, ShieldOff, Trash },
		components: {
			DropdownMenu,
			DropdownMenuContent,
			DropdownMenuItem,
			DropdownMenuSeparator,
			DropdownMenuTrigger,
			Button,
		},
	} = useDashboard();
	const [open, setOpen] = useState(false);
	const { setCurrentRow, setOpen: setOpenDialog } = useUsers();

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
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
					disabled={!row.getCanSelect()}
					onClick={() => {
						setCurrentRow(row.original);
						setOpenDialog("edit");
					}}
				>
					<Pencil />
					{t("users.table.actions.edit")}
				</DropdownMenuItem>

				<DropdownMenuItem
					disabled={!row.getCanSelect()}
					onClick={() => {
						setCurrentRow(row.original);
						setOpenDialog("impersonate");
					}}
				>
					<HatGlasses />
					{t("users.table.actions.impersonate")}
				</DropdownMenuItem>
				<ChangeRoleAction row={row} />
				<DropdownMenuSeparator />
				<RevokeSessionsActions row={row} setOpen={setOpen} />
				<DropdownMenuItem
					disabled={!row.getCanSelect()}
					onClick={() => {
						setCurrentRow(row.original);
						setOpenDialog("ban");
					}}
				>
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
				<DropdownMenuItem
					disabled={!row.getCanSelect()}
					onClick={() => {
						setCurrentRow(row.original);
						setOpenDialog("remove");
					}}
				>
					<Trash />
					{t("users.table.actions.removeUser")}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
DataTableRowActions.displayName = "DataTableRowActions";

const ChangeRoleAction = ({ row }: DataTableRowActionsProps) => {
	const {
		t,
		authClient,
		source,
		icons: { Check, Tag },
		components: {
			DropdownMenuSub,
			DropdownMenuSubTrigger,
			DropdownMenuSubContent,
			Command,
			CommandInput,
			CommandList,
			CommandEmpty,
			CommandGroup,
			CommandItem,
		},
	} = useDashboard();
	const { setData } = useUsers();
	const [open, setOpen] = useState(false);
	const [pendingRoles, setPendingRoles] = useState<string[]>(
		(row.original.role ?? "user").split(","),
	);

	const saveRoles = async (roles: string[]) => {
		await authClient.admin.setRole({
			userId: row.original.id,
			role: roles,
			fetchOptions: {
				onSuccess: (ctx) => {
					setData((prev) => {
						const idx = prev.users.findIndex((u) => u.id === ctx.data.user.id);
						if (idx === -1) return prev;
						const users = [...prev.users];
						users[idx] = { ...users[idx], ...ctx.data.user };
						return { ...prev, users };
					});
					// TODO: show success toast
				},
				onError: (ctx) => {
					setPendingRoles((row.original.role ?? "user").split(","));
					// TODO: Show error toast
				},
			},
		});
	};

	const toggleRole = (role: string) => {
		setPendingRoles((prev) => {
			if (prev.includes(role)) {
				if (prev.length <= 1) return prev; // never remove last
				return prev.filter((r) => r !== role);
			}
			return [...prev, role];
		});
	};

	return (
		<DropdownMenuSub
			open={open}
			onOpenChange={(open) => {
				setOpen(open);
				if (
					!open &&
					pendingRoles.join(",") !==
						(row.original.role || source.options.defaultRole || "user")
				) {
					saveRoles(pendingRoles);
				}
			}}
		>
			<DropdownMenuSubTrigger
				disabled={!row.getCanSelect()}
				className="data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 gap-x-2"
			>
				<Tag />
				{t("users.table.actions.changeRole")}
			</DropdownMenuSubTrigger>
			<DropdownMenuSubContent className="p-0">
				<Command>
					<CommandInput
						placeholder={t("users.table.actions.changeRole.placeholder")}
						autoFocus={true}
					/>
					<CommandList>
						<CommandEmpty>
							{t("users.table.actions.changeRole.noResults")}
						</CommandEmpty>
						<CommandGroup>
							{Object.entries(source.roles)
								.sort(sortAdminRolesFn())
								.map(([role, config]) => {
									const isSelected = pendingRoles.includes(role);
									const displayName = t("roleName", {
										role,
									});

									return (
										<CommandItem
											key={role}
											value={role}
											keywords={[displayName]}
											onSelect={(value) => {
												toggleRole(value);
											}}
										>
											<div
												className={cn(
													"border-primary flex size-4 items-center justify-center rounded-sm border",
													isSelected
														? "bg-priamry text-primary-foreground"
														: "opacity-50 [&_svg]:invisible",
												)}
											>
												<Check className="text-foreground size-3" />
											</div>
											{config.icon && <config.icon />}
											{displayName}
										</CommandItem>
									);
								})}
						</CommandGroup>
					</CommandList>
				</Command>
			</DropdownMenuSubContent>
		</DropdownMenuSub>
	);
};
ChangeRoleAction.displayName = "ChangeRoleAction";

const RevokeSessionsActions = ({
	row,
	setOpen,
}: DataTableRowActionsProps & {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const {
		t,
		authClient,
		icons: { ShieldX },
		components: { DropdownMenuItem },
	} = useDashboard();

	const handleSubmit = async () => {
		setOpen(false);
		await authClient.admin.revokeUserSessions({
			userId: row.original.id,
			fetchOptions: {
				onSuccess: () => {
					// TODO: Show success toast
				},
				onError: (ctx) => {
					// TODO: Show error toast
				},
			},
		});
	};

	return (
		<DropdownMenuItem disabled={!row.getCanSelect()} onClick={handleSubmit}>
			<ShieldX />
			{t("users.table.actions.revokeSessions")}
		</DropdownMenuItem>
	);
};
RevokeSessionsActions.displayName = "RevokeSessionsActions";
