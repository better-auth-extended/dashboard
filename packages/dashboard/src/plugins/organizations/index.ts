import { lazy } from "react";
import type { Plugin } from "../../types";

export const organizations = () => {
	return {
		id: "organizations",
		routes: ({ t }) => [
			{
				id: "organizations",
				title: t("organizations.title"),
				description: t("organizations.description"),
				slug: "organizations",
				icon: "Building2",
				component: lazy(() => import("./OrganizationsComponent")),
			},
		],
		translations: {
			"organizations.title": "Organizations",
			// TODO:
			"organizations.description":
				"Magna veniam excepteur nostrud officia anim ea.",
		},
	} satisfies Plugin;
};
