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
		},
		german: {
			displayName: "Deutsch",
			translations: {
				"home.title": "Übersicht",
				"home.welcome": "Willkommen im Dashboard",
				"ui.signOut": "Abmelden",
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
