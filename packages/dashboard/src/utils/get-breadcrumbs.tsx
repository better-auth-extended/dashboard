import type { Source } from "../source";
import type { PluginPage } from "../types";

export const getBreadcrumb = (page: PluginPage, source: Source) => {
	const { groupedPages, basePath } = source;

	if (page.id || (!page.id && !page.group)) {
		return [
			{
				title: page.title,
				href: `${basePath}/${page.slug.startsWith("/") ? page.slug.slice(1) : page.slug}`,
			},
		];
	}

	const parent = groupedPages.find((p) => p.id === page.group);
	if (!parent) {
		throw new Error(`Breadcrumb: parent group \`${page.group}\` not found`);
	}

	return [
		{
			title: parent.title,
			href: `${basePath}/${parent.slug.startsWith("/") ? parent.slug.slice(1) : parent.slug}`,
		},
		{
			title: page.title,
			href: `${basePath}/${page.slug.startsWith("/") ? page.slug.slice(1) : page.slug}`,
		},
	];
};
