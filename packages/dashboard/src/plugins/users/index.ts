import { lazy } from "react";
import type { Plugin } from "../../types";

export const users = () => {
	return {
		id: "users",
		routes: ({ t }) => [
			{
				title: t("users.title"),
				slug: "users",
				component: lazy(() => import("./UsersComponent")),
			},
		],
		translations: {
			"users.title": "Users",
			"users.description": "",
			"users.table.selectAll.aria-description": "Select all",
			"users.table.selectRow.aria-description": "Select row",
			"users.table.colName.user": "User",
			"users.table.colName.email": "Email",
			"users.table.colName.role": "Role",
			"users.table.colName.createdAt": "Created At",
		},
	} satisfies Plugin;
};
