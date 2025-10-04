"use client";

import type { PageComponent } from "../../types";
import { UserTable } from "./user-table";
import { UsersProvider } from "./users-provider";
import { UsersDialogs } from "./dialogs";
import { Main } from "../../ui/main";
import { Heading } from "../../ui/heading";

export default (function UsersComponent({ page, components: { Button } }) {
	return (
		<UsersProvider>
			<Main>
				<Heading heading={page.title} description={page.description}>
					{/* TODO: Primary actions */}
					<Button>Add user</Button>
				</Heading>

				<UserTable />

				<UsersDialogs />
			</Main>
		</UsersProvider>
	);
} satisfies PageComponent);
