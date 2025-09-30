"use client";

import { useDashboardPage } from "../../dashboard";
import { I18nLabel } from "../../ui/i18n-label";
import type { PageComponent } from "../../types";
import { UserTable } from "./user-table";

export default (function UsersComponent({ components, page }) {
	const { session } = useDashboardPage();

	return (
		<>
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
		</>
	);
} satisfies PageComponent);
