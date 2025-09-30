"use client";

import { source } from "@/lib/dashboard";
import { DashboardLayout } from "@better-auth-extended/dashboard";
import * as components from "@/components/ui";

export default function Layout(props: LayoutProps<"/dashboard">) {
	return (
		<DashboardLayout source={source} components={components}>
			{props.children}
		</DashboardLayout>
	);
}
