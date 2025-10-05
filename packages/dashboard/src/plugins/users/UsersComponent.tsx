"use client";

import type { PageComponent, PageComponentProps } from "../../types";
import { UserTable } from "./user-table";
import { UsersProvider, useUsers } from "./users-provider";
import { UsersDialogs } from "./dialogs";
import { Main } from "../../ui/main";
import { Heading } from "../../ui/heading";
import { memo } from "react";
import { I18nLabel } from "../../ui/i18n-label";

const UsersInner = memo(
	({ icons: { Plus }, components: { Button }, page }: PageComponentProps) => {
		const { setOpen } = useUsers();

		return (
			<Main>
				<Heading heading={page.title} description={page.description}>
					<Button
						onClick={() => {
							setOpen("create");
						}}
					>
						<Plus />
						<I18nLabel label="users.dialogs.createUser.trigger" />
					</Button>
				</Heading>

				<UserTable />

				<UsersDialogs />
			</Main>
		);
	},
);
UsersInner.displayName = "UsersInner";

export default (function UsersComponent(props) {
	return (
		<UsersProvider>
			<UsersInner {...props} />
		</UsersProvider>
	);
} satisfies PageComponent);
