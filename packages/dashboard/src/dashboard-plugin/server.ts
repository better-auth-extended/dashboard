import type { BetterAuthPlugin } from "better-auth";
import {
	createAuthEndpoint,
	getEndpoints,
	getSessionFromCtx,
} from "better-auth/api";
import type { admin, AdminOptions } from "better-auth/plugins/admin";

export type DashboardPluginConfig = {};

export const dashboardPlugin = (config: DashboardPluginConfig = {}) => {
	return {
		id: "better-auth-extended-dashboard",
		endpoints: {
			getAvailableEndpoints: createAuthEndpoint(
				"/dashboard/get-available-endpoints",
				{
					method: "GET",
				},
				async (ctx) => {
					const session = await getSessionFromCtx(ctx);
					const adminPlugin = ctx.context.options.plugins?.find(
						(plugin) => plugin.id === "admin",
					) as ReturnType<typeof admin<any>> | undefined;
					if (!adminPlugin) {
						throw ctx.error("FAILED_DEPENDENCY", {
							message: "Admin plugin is not set up",
						});
					}
					const adminOptions = adminPlugin.options as AdminOptions;
					const adminRoles = !adminOptions.adminRoles
						? ["admin"]
						: Array.isArray(adminOptions.adminRoles)
							? adminOptions.adminRoles
							: [adminOptions.adminRoles];

					if (!session || !adminRoles.includes(session.user.role)) {
						throw ctx.error("UNAUTHORIZED", {
							message: `Invalid or missing session.`,
						});
					}

					const endpoints = getEndpoints(ctx.context, ctx.context.options);
					const paths: string[] = endpoints.middlewares.map((x) => x.path);

					return ctx.json({
						paths,
					});
				},
			),
		},
	} satisfies BetterAuthPlugin;
};

export type DashboardPlugin = typeof dashboardPlugin;
