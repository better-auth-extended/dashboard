"use client";

import { source } from "@/lib/dashboard";
import { DashboardLayout } from "@better-auth-extended/dashboard";
import * as components from "@/components/ui";
import { useTheme } from "next-themes";

export default function Layout(props: LayoutProps<"/dashboard">) {
	const { resolvedTheme, setTheme } = useTheme();

	return (
		<DashboardLayout
			source={source}
			components={components}
			theme={resolvedTheme}
			onThemeChange={setTheme}
		>
			{props.children}
		</DashboardLayout>
	);
}
