"use client";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { FrameworkProvider, useRouter, type Framework } from "./framework";
import { nextProvider } from "./framework/next";
import type { Components } from "./types/components";
import { createContext } from "./utils/create-context";
import { DashboardUI } from "./ui";
import {
	isTranslatableString,
	type Slugs,
	type Source,
	type TranslatableString,
} from "./source";
import type { Session, User } from "better-auth";
import type { Icons } from "./types/icons";
import { defaultIcons } from "./utils/icons";
import * as defaultComponents from "./default-components";

export type DashboardConfig = {
	/**
	 * @default nextProvider
	 */
	framework?: Framework;
	components: Components;
	icons?: Partial<Icons>;
	source: Source;
	children?: React.ReactNode;
	onLanguageChange?: (value?: string | undefined) => any;
};

export type DashboardPageContext = {
	slugs?: string[];
	session: {
		session: Session & Record<string, any>;
		user: User & Record<string, any>;
	};
};

const DashboardPageContext = createContext<DashboardPageContext>(
	"DashboardPageContext",
	null!,
);

export const useDashboardPage = () => {
	const state = DashboardPageContext.use();
	return state;
};

export type DashboardContext = {
	basePath: string;
	source: Source;
	components: Required<Components>;
	icons: Icons;
	authClient: Source["authClient"];
	language: string | undefined;
	setLanguage: React.Dispatch<React.SetStateAction<string | undefined>>;
	t: (
		key: string,
		vars?: Record<string, string | number | null | undefined>,
	) => string;
	translate: (value: string | TranslatableString) => string;
};

const DashboardContext = createContext<DashboardContext>(
	"DashboardContext",
	null!,
);

export const useDashboard = () => {
	const state = DashboardContext.use();
	return state;
};

export type DashboardProps = {
	slugs: Slugs;
	session?: {
		session: Session & Record<string, any>;
		user: User & Record<string, any>;
	} | null;
	sidebar?: {
		header?: Omit<
			React.ComponentProps<Components["SidebarHeader"]>,
			"children"
		> & {
			enabled?: boolean;
			component?: React.ReactNode;
		};
	};
};

export const Dashboard = memo(
	<O extends DashboardProps>({
		slugs,
		session: prefetchedSession,
		sidebar,
	}: O) => {
		const { authClient, source } = useDashboard();
		// TODO: Skip initial fetch when prefetchedSession is provided?
		const session = authClient.useSession().data ?? prefetchedSession;
		const router = useRouter();

		const page = useMemo(() => source.getPage(slugs), [source, slugs]);

		useEffect(() => {
			const userRoles = (
				session?.user.role ||
				source.options.defaultRole ||
				"user"
			).split(",");
			if (
				!session?.user.role ||
				!Object.keys(source.adminRoles).some((role) => userRoles.includes(role))
			) {
				// TODO: Get from options
				router.push("/sign-in");
			}
		}, [session, source.adminRoles, router]);

		if (!page) {
			throw new Error("Page not found");
		}

		return (
			<DashboardPageContext.Provider
				value={{
					slugs:
						!slugs || slugs?.length === 0
							? undefined
							: Array.isArray(slugs)
								? slugs
								: [slugs],
					session: session!,
				}}
			>
				<DashboardUI page={page} sidebar={sidebar} />
			</DashboardPageContext.Provider>
		);
	},
);
Dashboard.displayName = "Dashboard";

type Exact<T, Shape extends T> = T & {
	[K in Exclude<keyof Shape, keyof T>]: never;
};

export const DashboardLayout = memo(
	<O extends DashboardConfig>({
		framework: initFramework = nextProvider,
		components,
		icons,
		source,
		children,
		onLanguageChange,
	}: Exact<DashboardConfig, O>) => {
		const [language, setLanguage] = useState<string | undefined>(undefined);
		const framework = useMemo(() => initFramework(), [initFramework]);

		useEffect(() => {
			onLanguageChange?.(language);
		}, [language]);

		const t = useCallback(
			(
				key: string,
				vars?: Record<string, string | number | null | undefined>,
			) => {
				const res = source
					.t(key, {
						language,
						vars,
					})
					.toString();

				return res;
			},
			[language],
		);

		const translate = useCallback(
			(value: string | TranslatableString, vars?: Record<string, any>) => {
				return (
					isTranslatableString(value) && language
						? value.translateTo(language, vars)
						: value
				)?.toString();
			},
			[language],
		);

		const value = useMemo(
			() =>
				({
					basePath: source.basePath,
					source,
					components: {
						...defaultComponents,
						...components,
					},
					icons: {
						...defaultIcons,
						...icons,
					},
					authClient: source.authClient,
					language,
					setLanguage,
					t,
					translate,
				}) satisfies DashboardContext,
			[
				source.basePath,
				source,
				components,
				icons,
				source.authClient,
				language,
				t,
				translate,
			],
		);

		return (
			<FrameworkProvider {...framework}>
				<components.SidebarProvider>
					<DashboardContext.Provider value={value as any}>
						{children}
					</DashboardContext.Provider>
				</components.SidebarProvider>
			</FrameworkProvider>
		);
	},
);
DashboardLayout.displayName = "DashboardLayout";
