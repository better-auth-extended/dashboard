"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { UserWithRole } from "better-auth/plugins/admin";
import type { Components } from "../../../types/components";
import type { DashboardContext } from "../../../dashboard";

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
						{/* TODO: pfp */}
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
			cell: ({ getValue }) => {
				return (
					<div className="flex items-center">
						<span className="capitalize">{getValue<string>()}</span>
					</div>
				);
			},
			size: 100,
		},
		{
			accessorKey: "createdAt",
			header: t("users.table.colName.createdAt"),
			cell: ({ getValue }) => {
				return (
					<div className="flex items-center">
						{getValue<Date>().toDateString()}
					</div>
				);
			},
		},
	];
};
