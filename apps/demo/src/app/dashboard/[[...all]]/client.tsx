"use client";

import { Dashboard, DashboardProps } from "@better-auth-extended/dashboard";
import { Slugs } from "@better-auth-extended/dashboard/source";

export function DashboardPage({
	slugs,
	session,
}: {
	slugs: Slugs;
	session: DashboardProps["session"];
}) {
	return <Dashboard slugs={slugs} session={session} />;
}
