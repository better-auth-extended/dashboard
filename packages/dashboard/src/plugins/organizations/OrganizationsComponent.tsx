"use client";

import { memo } from "react";
import type { PageComponent, PageComponentProps } from "../../types";
import { Main } from "../../ui/main";
import { Heading } from "../../ui/heading";

const OrganizationsInner = memo(
	({ icons, components, page }: PageComponentProps) => {
		return (
			<Main>
				<Heading heading={page.title} description={page.description}></Heading>
			</Main>
		);
	},
);
OrganizationsInner.displayName = "OrganizationsInner";

export default (function OrganizationsComponent(props) {
	return (
		<>
			<OrganizationsInner {...props} />
		</>
	);
} satisfies PageComponent);
