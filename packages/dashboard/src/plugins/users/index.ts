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
			"users.dialogs.banUser.title": "Ban user",
			"users.dialogs.banUser.description": {
				vars: ["email", "name"],
				fallbackValue: ({ email, name }) =>
					`You are about to ban ${name} (${email}). This will immediately block their account from accessing the platform.`,
			},
			"users.dialogs.banUser.fields.reason.label": "Reason",
			"users.dialogs.banUser.fields.reason.placeholder": "Reason",
			"users.dialogs.banUser.fields.duration.label": "Duration",
			"users.dialogs.banUser.fields.duration.placeholder": "Select duration",
			"users.dialogs.banUser.fields.duration.permanent": "Forever",
			"users.dialogs.banUser.fields.duration.custom": "Custom",
			"users.dialogs.banUser.fields.duration.custom.typeName": {
				vars: ["type"],
				fallbackValue: ({ type }) => {
					const typeNameMap: Record<string, string> = {
						seconds: "Second(s)",
						minutes: "Minute(s)",
						hours: "Hour(s)",
						days: "Day(s)",
						weeks: "Week(s)",
					};

					return `${typeNameMap[`${type}`]}`;
				},
			},
			"users.dialogs.banUser.fields.duration.preset": {
				vars: ["value", "type"],
				fallbackValue: ({ value, type }) => {
					const plural = Number(value) > 1;
					const typeNameMap: Record<string, string> = {
						seconds: "second",
						minutes: "minute",
						hours: "hour",
						days: "day",
						weeks: "week",
					};

					return `${value} ${typeNameMap[`${type}`]}${plural ? "s" : ""}`;
				},
			},
			"users.dialogs.banUser.ban": "Ban",
			"users.dialogs.banUser.cancel": "Cancel",
			"users.dialogs.unbanUser.title": "Unban User",
			"users.dialogs.unbanUser.description": {
				vars: ["email", "name"],
				fallbackValue: ({ email, name }) =>
					`Are you sure you want to unban ${name} (${email})? This will restore their access to the platform.`,
			},
			"users.dialogs.unbanUser.unban": "Unban",
			"users.dialogs.unbanUser.cancel": "Cancel",
			"users.dialogs.removeUser.title": "Remove user",
			"users.dialogs.removeUser.description": {
				vars: ["email", "name"],
				fallbackValue: ({ email, name }) => ``,
			},
			"users.dialogs.removeUser.remove": "Remove user",
			"users.dialogs.removeUser.cancel": "Cancel",
		},
	} satisfies Plugin;
};
