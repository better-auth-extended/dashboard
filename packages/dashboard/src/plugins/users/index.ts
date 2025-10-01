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
			"users.table.toolbar.facetedFilter.selected": {
				vars: ["size"],
				fallbackValue: ({ size }) => `${size} selected`,
			},
			"users.table.toolbar.facetedFilter.noResults": "No results",
			"users.table.toolbar.facetedFilter.clear": "Clear filters",
			"users.table.toolbar.search": "Filter users...",
			"users.table.toolbar.reset": "Reset",
			"users.table.toolbar.view": "View",
			"users.table.toolbar.view.label": "Toggle columns",
			"users.table.actions.edit": "Edit",
			"users.table.actions.impersonate": "Impersonate",
			"users.table.actions.ban": "Ban",
			"users.table.actions.unban": "Unban",
			"users.table.actions.removeUser": "Remove user",
			"users.dialogs.editUser.title": "Edit User",
			"users.dialogs.editUser.description": "Edit the user details",
			"users.dialogs.editUser.fields.name.label": "Name",
			"users.dialogs.editUser.fields.name.placeholder": "Name",
			"users.dialogs.editUser.fields.role.label": "Role",
			"users.dialogs.editUser.fields.role.placeholder": "Select Role",
			"users.dialogs.editUser.fields.email.label": "Email",
			"users.dialogs.editUser.fields.email.placeholder": "Email",
			"users.dialogs.editUser.cancel": "Cancel",
			"users.dialogs.editUser.save": "Save changes",
		},
	} satisfies Plugin;
};
