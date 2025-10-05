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
				"ui.passwordInput.toggleVisibility.hide.aria-label":
					"Passwort verstecken",
				"ui.passwordInput.toggleVisibility.show.aria-label":
					"Passwort anzeigen",
				"ui.state.loading.aria-label": "Laden...",
				"ui.languageSwitch.aria-label": "Sprache ändern",
				"ui.languageSwitch.noResults": "Keine Resultate",
				"ui.languageSwitch.placeholder": "Sprache suchen...",
				"ui.multiselect.creatableItem.label": (vars) =>
					`Erstelle "${vars.inputValue}"`,
				"ui.multiselect.remove.aria-label": "Entfernen",
				"ui.multiselect.clearAll.aria-label": "Alle entfernen",
				"ui.dataTable.noResults": "Keine Resultate",
				"ui.dataTable.toolbar.view": "Ansicht",
				"ui.dataTable.toolbar.view.label": "Spalten ein-/ausblenden",
				"ui.dataTable.toolbar.reset": "Zurücksetzen",
				"ui.dataTable.facetedFilter.selected": (vars) =>
					`${vars.size} ausgewählt`,
				"ui.dataTable.facetedFilter.noResults": "Keine Resultate",
				"ui.dataTable.facetedFilter.clear": "Zurücksetzen",
				"ui.dataTable.pagination.itemsPerPage": "Reihen pro Seite",
				"ui.dataTable.pagination.pageIndicator": (vars) =>
					`Seite ${vars.currentPage} von ${vars.totalPages}`,
				"ui.dataTable.pagination.goToFirstPage.aria-label":
					"Gehe zur ersten Seite",
				"ui.dataTable.pagination.goToPreviousPage.aria-label":
					"Gehe zur vorherigen Seite",
				"ui.dataTable.pagination.goToPage.aria-label": (vars) =>
					`Gehe zu Seite ${vars.pageNumber}`,
				"ui.dataTable.pagination.goToNextPage.aria-label":
					"Gehe zur nächsten Seite",
				"ui.dataTable.pagination.goToLastPage.aria-label":
					"Gehe zur letzten Seite",
				"home.title": "Übersicht",
				"home.welcome": "Willkommen im Dashboard",
				"users.title": "Benutzer",
				"users.table.colName.user": "Benutzer",
				"users.table.colName.email": "E-Mail",
				"users.table.colName.role": "Rolle",
				"users.table.colName.createdAt": "Beigetreten am",
				"users.table.selectAll.aria-description": "Alle auswählen",
				"users.table.selectRow.aria-description": "Reihe auswählen",
				// TODO:
				"users.description":
					"Cillum proident et elit cupidatat sunt cillum ad esse elit.",
				"ui.openMenu.aria-label": "Menü öffnen",
				"users.table.toolbar.facetedFilter.role.label": "Rolle",
				"users.table.toolbar.search": "Benutzer filtern...",
				"users.table.actions.edit": "Bearbeiten",
				"users.table.actions.impersonate": "Als Benutzer anmelden",
				"users.table.actions.ban": "Sperren",
				"users.table.actions.unban": "Entsperren",
				"users.table.actions.removeUser": "Benutzer entfernen",
				"users.table.actions.changeRole": "Rolle ändern",
				"users.table.actions.changeRole.placeholder": "Rolle",
				"users.table.actions.changeRole.noResults": "Keine Resultate",
				"users.table.actions.revokeSessions": "Sitzungen beenden",
				"users.dialogs.editUser.title": "Benutzer bearbeiten",
				"users.dialogs.editUser.description": "Benutzerdetails bearbeiten",
				"users.dialogs.editUser.fields.image.changeImage": "Bild ändern",
				"users.dialogs.editUser.fields.image.removeImage.aria-label":
					"Bild entfernen",
				"users.dialogs.editUser.fields.image.dropArea.title":
					"Bilddatei ablegen",
				"users.dialogs.editUser.fields.image.dropArea.description": (vars) =>
					`Maximale Größe: ${vars.maxSizeMB} MB`,
				"users.dialogs.editUser.fields.image.label": "Profilbild",
				"users.dialogs.editUser.fields.image.description": (vars) =>
					`Maximale Größe: ${vars.maxSizeMB} MB`,
				"users.dialogs.editUser.fields.image.aria-label": "Bilddatei hochladen",
				"users.dialogs.editUser.fields.image.uploadImage": "Bild hochladen",
				"users.dialogs.editUser.fields.name.label": "Name",
				"users.dialogs.editUser.fields.name.placeholder": "Name",
				"users.dialogs.editUser.fields.role.label": "Rolle",
				"users.dialogs.editUser.fields.role.placeholder": "Rolle auswählen",
				"users.dialogs.editUser.fields.email.label": "E-Mail",
				"users.dialogs.editUser.fields.email.placeholder": "E-Mail",
				"users.dialogs.editUser.cancel": "Abbrechen",
				"users.dialogs.editUser.save": "Änderungen speichern",
				"users.dialogs.editUser.cropImage.title": "Bild zuschneiden",
				"users.dialogs.editUser.cropImage.description": "Bild zuschneiden",
				"users.dialogs.editUser.cropImage.cancel.aria-label": "Abbrechen",
				"users.dialogs.editUser.cropImage.apply": "Anwenden",
				"users.dialogs.editUser.cropImage.zoomSlider.aria-label": "Zoom-Regler",
				"users.dialogs.banUser.ban": "Sperren",
				"users.dialogs.banUser.cancel": "Abbrechen",
				"users.dialogs.banUser.title": "Benutzer sperren",
				"users.dialogs.banUser.description": (vars) =>
					`Du bist dabei, ${vars.name} (${vars.email}) zu sperren. Dadurch wird das Konto sofort blockiert und der Zugriff auf die Plattform verhindert.`,
				"users.dialogs.banUser.fields.reason.label": "Grund",
				"users.dialogs.banUser.fields.reason.placeholder": "Grund",
				"users.dialogs.banUser.fields.duration.label": "Dauer",
				"users.dialogs.banUser.fields.duration.placeholder": "Dauer wählen",
				"users.dialogs.banUser.fields.duration.permanent": "Permanent",
				"users.dialogs.banUser.fields.duration.custom": "Benutzerdefiniert",
				"users.dialogs.banUser.fields.duration.custom.typeName": ({ type }) => {
					const typeNameMap: Record<string, string> = {
						seconds: "Sekunde(n)",
						minutes: "Minute(n)",
						hours: "Stunde(n)",
						days: "Tag(e)",
						weeks: "Woche(n)",
					};

					return `${typeNameMap[`${type}`]}`;
				},
				"users.dialogs.banUser.fields.duration.preset": ({ value, type }) => {
					const plural = Number(value) > 1;
					const typeNameMap: Record<string, string> = {
						seconds: `Sekunde${plural ? "n" : ""}`,
						minutes: `Minute${plural ? "n" : ""}`,
						hours: `Stunde${plural ? "n" : ""}`,
						days: `Tag${plural ? "e" : ""}`,
						weeks: `Woche${plural ? "n" : ""}`,
					};

					return `${value} ${typeNameMap[`${type}`]}`;
				},
				"users.dialogs.unbanUser.title": "Benutzer entsperren",
				"users.dialogs.unbanUser.description": (vars) =>
					`Bist du sicher, dass du ${vars.name} (${vars.email}) entsperren möchtest? Dadurch wird der Zugriff auf die Plattform wiederhergestellt.`,
				"users.dialogs.unbanUser.unban": "Entsperren",
				"users.dialogs.unbanUser.cancel": "Abbrechen",
				"users.dialogs.removeUser.title": "Benutzer entfernen",
				"users.dialogs.removeUser.description": (vars) => ``,
				"users.dialogs.removeUser.remove": "Benutzer entfernen",
				"users.dialogs.removeUser.cancel": "Abbrechen",
				"users.dialogs.impersonateUser.title": "Als Benutzer anmelden",
				"users.dialogs.impersonateUser.description": (vars) =>
					`Du bist dabei, dich als ${vars.name} (${vars.email}) anzumelden. Alle Aktionen, die du ausführst, werden so angezeigt, als kämen sie von diesem Benutzer. Vorsicht beim Fortfahren.`,
				"users.dialogs.impersonateUser.impersonate": "Anmelden",
				"users.dialogs.impersonateUser.cancel": "Abbrechen",
				"users.dialogs.createUser.trigger": "Benutzer erstellen",
				"users.dialogs.createUser.title": "Benutzer erstellen",
				"users.dialogs.createUser.description":
					"Gib die Daten für einen neuen Benutzer ein.",
				"users.dialogs.createUser.fields.name.label": "Name",
				"users.dialogs.createUser.fields.name.placeholder": "Name",
				"users.dialogs.createUser.fields.email.label": "E-Mail",
				"users.dialogs.createUser.fields.email.placeholder": "E-Mail",
				"users.dialogs.createUser.fields.password.label": "Passwort",
				"users.dialogs.createUser.fields.password.placeholder": "Passwort",
				"users.dialogs.createUser.fields.role.label": "Rolle",
				"users.dialogs.createUser.fields.role.placeholder": "Rolle wählen",
				"users.dialogs.createUser.fields.role.noResults": "Keine Resultate",
				"users.dialogs.createUser.create": "Benutzer erstellen",
				"users.dialogs.createUser.cancel": "Abbrechen",
				"users.dialogs.editUser.fields.role.noResults": "Keine Resultate",
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
