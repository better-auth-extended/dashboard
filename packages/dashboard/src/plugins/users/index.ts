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
			"users.table.toolbar.facetedFilter.role.label": "Role",
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
			"users.dialogs.editUser.fields.image.label": "Avatar",
			"users.dialogs.editUser.fields.image.description": {
				vars: ["maxSize", "maxSizeMB"],
				fallbackValue: ({ maxSizeMB }) => `Max size: ${maxSizeMB}MB`,
			},
			"users.dialogs.editUser.fields.image.changeImage": "Change image",
			"users.dialogs.editUser.fields.image.removeImage.aria-label":
				"Remove image",
			"users.dialogs.editUser.fields.image.dropArea.title":
				"Drop your image here",
			"users.dialogs.editUser.fields.image.dropArea.description": {
				vars: ["maxSize", "maxSizeMB"],
				fallbackValue: ({ maxSizeMB }) => `Max size: ${maxSizeMB}MB`,
			},
			"users.dialogs.editUser.fields.image.aria-label": "Upload image file",
			"users.dialogs.editUser.fields.image.uploadImage": "Upload image",
			"users.dialogs.editUser.fields.name.label": "Name",
			"users.dialogs.editUser.fields.name.placeholder": "Name",
			"users.dialogs.editUser.fields.role.label": "Role",
			"users.dialogs.editUser.fields.role.placeholder": "Select Role",
			"users.dialogs.editUser.fields.email.label": "Email",
			"users.dialogs.editUser.fields.email.placeholder": "Email",
			"users.dialogs.editUser.cancel": "Cancel",
			"users.dialogs.editUser.save": "Save changes",
			"users.dialogs.editUser.cropImage.title": "Crop image",
			"users.dialogs.editUser.cropImage.description": "Crop image dialog",
			"users.dialogs.editUser.cropImage.cancel.aria-label": "Cancel",
			"users.dialogs.editUser.cropImage.apply": "Apply",
			"users.dialogs.editUser.cropImage.zoomSlider.aria-label": "Zoom slider",
			"users.dialogs.impersonateUser.title": "Impersonate user",
			"users.dialogs.impersonateUser.description": {
				vars: ["email", "name"],
				fallbackValue: ({ email, name }) =>
					`You are about to impersonate ${name} (${email}). All actions you take will appear as if performed by this user. Proceed with caution.`,
			},
			"users.dialogs.impersonateUser.cancel": "Cancel",
			"users.dialogs.impersonateUser.impersonate": "Impersonate",
		},
	} satisfies Plugin;
};
