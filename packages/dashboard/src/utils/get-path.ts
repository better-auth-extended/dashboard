export const getPath = (basePath: string, slug: string) => {
	return `${basePath}${slug !== "/" ? (slug.startsWith("/") ? slug : `/${slug}`) : ""}`;
};
