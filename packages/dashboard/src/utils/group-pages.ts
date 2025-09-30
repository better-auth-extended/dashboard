import type { PluginPage } from "../types";

type GroupedPage = PluginPage & {
	children?: PluginPage[];
};

export const groupPages = (pages: PluginPage[]): GroupedPage[] => {
	const roots: Record<string, GroupedPage> = {};
	const result: GroupedPage[] = [];

	for (const page of pages) {
		if (page.id) {
			roots[page.id] = { ...page, children: [] };
			result.push(roots[page.id]!);
		} else if (page.group) {
			const parent = roots[page.group];
			if (!parent) {
				throw new Error(
					`Group \`${page.group}\` not defined for page \`${page.title}\``,
				);
			}
			parent.children!.push(page);
		} else {
			result.push(page);
		}
	}

	return result;
};
