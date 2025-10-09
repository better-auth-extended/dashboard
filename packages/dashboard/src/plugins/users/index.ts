import { lazy } from "react";
import type { Plugin } from "../../types";
import { adminTranslations } from "./translations";

export const users = () => {
	return {
		id: "users",
		routes: ({ t }) => [
			{
				id: "users",
				title: t("users.title"),
				description: t("users.description"),
				slug: "users",
				icon: "Users",
				component: lazy(() => import("./UsersComponent")),
			},
		],
		translations: adminTranslations,
	} satisfies Plugin;
};
