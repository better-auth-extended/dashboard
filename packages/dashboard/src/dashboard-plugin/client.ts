import type { BetterAuthClientPlugin } from "better-auth/client";
import type { DashboardPlugin } from "./server";

export const dashboardClientPlugin = () =>
	({
		id: "better-auth-dashboard",
		$InferServerPlugin: {} as ReturnType<DashboardPlugin>,
	}) satisfies BetterAuthClientPlugin;
