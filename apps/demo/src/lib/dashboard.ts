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
			},
		},
	},
});
