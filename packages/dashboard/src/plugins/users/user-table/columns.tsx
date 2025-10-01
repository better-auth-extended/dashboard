"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { UserWithRole } from "better-auth/plugins/admin";
import type { Components } from "../../../types/components";
import { useDashboard, type DashboardContext } from "../../../dashboard";
import { UserImage } from "../../../ui/user-image";
import { DataTableRowActions } from "./data-table-row-actions";

type ColumnsFn = (data: {
	components: Components;
	t: DashboardContext["t"];
}) => ColumnDef<UserWithRole>[];

export const columns: ColumnsFn = ({ components, t }) => {
	const { Checkbox, Badge } = components;

	return [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label={t("users.table.selectAll.aria-description")}
					className="-mt-1"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label={t("users.table.selectRow.aria-description")}
					className="-mt-1"
				/>
			),
			size: 28,
			enableSorting: false,
			enableHiding: false,
		},
		{
			id: "user",
			accessorFn: ({ name, image }) => ({
				image: image ?? undefined,
				name,
			}),
			header: t("users.table.colName.user"),
			meta: {
				displayName: t("users.table.colName.user"),
			},
			filterFn: (row, _id, filterValue) => {
				return row.original.name
					.toLowerCase()
					.includes(filterValue.toLowerCase());
			},
			cell: ({ getValue }) => {
				const { name, image } = getValue<{
					name: string;
					image?: string;
				}>();

				return (
					<div className="truncate flex gap-2 items-center justify-start">
						<UserImage
							user={{
								name,
								image
							}}
							className="size-7"
						/>
						<span>{name}</span>
					</div>
				);
			},
			size: 180,
			enableSorting: true,
			enableHiding: false,
		},
		{
			id: "email",
			accessorFn: ({ email, emailVerified }) => ({
				email,
				emailVerified,
			}),
			header: t("users.table.colName.email"),
			meta: {
				displayName: t("users.table.colName.email"),
			},
			cell: ({ getValue }) => {
				const { email, emailVerified } = getValue<{
					email: string;
					emailVerified: boolean;
				}>();
				return (
					<div className="flex gap-x-2">
						<div className="truncate font-medium">{email}</div>
						{emailVerified && <Badge variant="outline">Verified</Badge>}
					</div>
				);
			},
			size: 220,
		},
		{
			accessorKey: "role",
			header: t("users.table.colName.role"),
			meta: {
				displayName: t("users.table.colName.role"),
			},
			cell: ({ getValue }) => {
				const { source, t, icons } = useDashboard();
				const { Tag } = icons;
				const role = getValue<string>()
				const config = source.roles[role];

				const Icon = config?.icon ?? Tag; 

				return (
					<Badge variant="outline" className="flex items-center rounded-sm">
						<Icon className="-ms-0.5 mr-0.5 size-4" />
						<span>
							{t("roleName", {
								role,
							})}
						</span>
					</Badge>
				);
			},
			size: 100,
		},
		{
			accessorKey: "createdAt",
			header: t("users.table.colName.createdAt"),
			meta: {
				displayName: t("users.table.colName.createdAt"),
			},
			cell: ({ getValue }) => {
				return (
					<div className="flex items-center">
						{getValue<Date>().toDateString()}
					</div>
				);
			},
		},
		{
			id: "actions",
			cell: ({ row }) => (
				<DataTableRowActions row={row} />
			),
			enableHiding: false,
			enableSorting: false,
			size: 30
		}
	];
};
