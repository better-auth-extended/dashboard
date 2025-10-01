import { createSource } from "@better-auth-extended/dashboard/source";
import { users } from "@better-auth-extended/dashboard/plugins/users";
import { authClient } from "@/lib/auth-client";

export const source = createSource({
	basePath: "/dashboard",
	plugins: [users()],
	authClient,
	defaultLanguage: "english",
	i18n: {
		english: {
			displayName: "English",
			icon: "\uD83C\uDDFA\uD83C\uDDF8",
		},
		german: {
			displayName: "Deutsch",
			icon: "\uD83C\uDDE9\uD83C\uDDEA",
			translations: {
				"ui.signOut": "Abmelden",
				"ui.languageSwitch.aria-label": "Sprache ändern",
				"ui.languageSwitch.noResults": "Keine Resultate",
				"ui.languageSwitch.placeholder": "Sprache suchen...",
				"home.title": "Übersicht",
				"home.welcome": "Willkommen im Dashboard",
				"users.title": "Benutzer",
				"users.table.colName.user": "Benutzer",
				"users.table.colName.email": "E-Mail",
				"users.table.colName.role": "Rolle",
				"users.table.colName.createdAt": "Beigetreten am",
				"users.table.selectAll.aria-description": "Alle auswählen",
				"users.table.selectRow.aria-description": "Reihe auswählen",
				"users.description": "",
				"ui.openMenu.aria-label": "Menü öffnen",
				"users.table.toolbar.facetedFilter.noResults": "Keine Resultate",
				"users.table.toolbar.facetedFilter.clear": "Zurücksetzen",
				"users.table.toolbar.facetedFilter.selected": (vars) =>
					`${vars.size} ausgewählt`,
				"users.table.toolbar.search": "Benutzer filtern...",
				"users.table.toolbar.reset": "Zurücksetzen",
				"users.table.toolbar.view": "Ansicht",
				"users.table.toolbar.view.label": "Spalten ein-/ausblenden",
				"users.table.actions.edit": "Bearbeiten",
				"users.table.actions.impersonate": "Als Benutzer anmelden",
				"users.table.actions.ban": "Sperren",
				"users.table.actions.unban": "Entsperren",
				"users.table.actions.removeUser": "Benutzer entfernen",
				"users.dialogs.editUser.title": "Benutzer bearbeiten",
				"users.dialogs.editUser.description": "Benutzerdetails bearbeiten",
				"users.dialogs.editUser.fields.name.label": "Name",
				"users.dialogs.editUser.fields.name.placeholder": "Name",
				"users.dialogs.editUser.fields.role.label": "Rolle",
				"users.dialogs.editUser.fields.role.placeholder": "Rolle auswählen",
				"users.dialogs.editUser.fields.email.label": "E-Mail",
				"users.dialogs.editUser.fields.email.placeholder": "E-Mail",
				"users.dialogs.editUser.cancel": "Abbrechen",
				"users.dialogs.editUser.save": "Änderungen speichern",
				roleName: (vars) => {
					const role = `${vars.role}`;
					if (role === "user") {
						return "Benutzer";
					}
					return role.charAt(0).toUpperCase() + role.slice(1);
				},
			},
		},
	},
});
