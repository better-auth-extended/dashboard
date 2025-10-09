import type { PluginTranslations } from "./types";

export const defaultTranslations = {
	roleName: {
		vars: ["role"],
		fallbackValue: ({ role }) => {
			const value = `${role}`;

			return value.charAt(0).toUpperCase() + value.slice(1);
		},
	},
	"ui.signOut": "Sign out",
	"ui.languageSwitch.aria-label": "Change language",
	"ui.languageSwitch.noResults": "No results",
	"ui.languageSwitch.placeholder": "Language",
	"ui.openMenu.aria-label": "Open menu",
	"ui.passwordInput.toggleVisibility.hide.aria-label": "Hide password",
	"ui.passwordInput.toggleVisibility.show.aria-label": "Show password",
	"ui.state.loading.aria-label": "Loading...",
	"ui.multiselect.creatableItem.label": {
		vars: ["inputValue"],
		fallbackValue: ({ inputValue }) => `Create "${inputValue}"`,
	},
	"ui.multiselect.remove.aria-label": "Remove",
	"ui.multiselect.clearAll.aria-label": "Clear all",
	"ui.dataTable.toolbar.view": "View",
	"ui.dataTable.toolbar.view.label": "Toggle columns",
	"ui.dataTable.toolbar.reset": "Reset",
	"ui.dataTable.facetedFilter.selected": {
		vars: ["size"],
		fallbackValue: ({ size }) => `${size} selected`,
	},
	"ui.dataTable.facetedFilter.noResults": "No results",
	"ui.dataTable.facetedFilter.clear": "Clear filters",
	"ui.dataTable.noResults": "No results",
	"ui.dataTable.pagination.itemsPerPage": "Items per page",
	"ui.dataTable.pagination.pageIndicator": {
		vars: ["currentPage", "totalPages"],
		fallbackValue: ({ currentPage, totalPages }) =>
			`Page ${currentPage} of ${totalPages}`,
	},
	"ui.dataTable.pagination.goToFirstPage.aria-label": "Go to first page",
	"ui.dataTable.pagination.goToPreviousPage.aria-label": "Go to previous page",
	"ui.dataTable.pagination.goToPage.aria-label": {
		vars: ["pageNumber"],
		fallbackValue: ({ pageNumber }) => `Go to page ${pageNumber}`,
	},
	"ui.dataTable.pagination.goToNextPage.aria-label": "Go to next page",
	"ui.dataTable.pagination.goToLastPage.aria-label": "Go to last page",
	"ui.themeSwitch.aria-label": "Switch theme",
	"ui.themeSwitch.light": "Light",
	"ui.themeSwitch.dark": "Dark",
	"ui.themeSwitch.system": "System",
	"home.title": "Home",
	"home.welcome": "Welcome to the dashboard",
} as const satisfies PluginTranslations;
