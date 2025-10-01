"use client";

import { useDashboardPage } from "../../dashboard";
import { I18nLabel } from "../../ui/i18n-label";
import type { PageComponent } from "../../types";
import { UserTable } from "./user-table";
import { UsersProvider } from "./users-provider";
import { UsersDialogs } from "./dialogs";

export default (function UsersComponent({ components, page }) {
	const { session } = useDashboardPage();

	return (
		<UsersProvider>
			<h1>{page.title}</h1>
			<p>
				<I18nLabel
					label="users.description"
					vars={{
						name: session.user.name,
					}}
				/>
			</p>
			<UserTable />

			<UsersDialogs />
		</UsersProvider>
	);
} satisfies PageComponent);
