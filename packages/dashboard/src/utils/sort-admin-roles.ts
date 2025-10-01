import type { RoleMap } from "../source";

type RoleEntry = [string, RoleMap[string]];

export type SortAdminRolesFnOptions = {
	/**
	 * @default "desc"
	 */
	dir?: "asc" | "desc";
};

export const sortAdminRolesFn = (options?: SortAdminRolesFnOptions) => {
	const dir = options?.dir !== "asc" ? 1 : -1;

	return ([_, a]: RoleEntry, [__, b]: RoleEntry) => {
		const aVal = Number(a.isAdminRole || false);
		const bVal = Number(b.isAdminRole || false);

		return (bVal - aVal) * dir;
	};
};

export const sortAdminRoles = (
	roles: RoleMap,
	options?: SortAdminRolesFnOptions,
): RoleMap => {
	return Object.fromEntries(
		Object.entries(roles).sort(sortAdminRolesFn(options)),
	);
};
