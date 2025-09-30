import type { LoaderFunction } from "react-router";
import type { Plugin, PluginPage, PluginTranslations } from "./types/plugin";
import { createAuthClient } from "better-auth/react";
import type {
	betterAuth,
	LiteralString,
	Session,
	UnionToIntersection,
	User,
} from "better-auth";
import { groupPages } from "./utils/group-pages";
import type { adminClient } from "better-auth/client/plugins";
import type { admin } from "better-auth/plugins/admin";
import { lazy, type ComponentType } from "react";
import type {
	dashboardClientPlugin,
	DashboardPlugin,
} from "./dashboard-plugin";

export type Slugs = string | string[] | undefined | null;

type NormalizeTranslations<T extends Plugin["translations"]> = {
	[K in keyof T]: T[K] extends string
		? {
				fallbackValue: string;
			}
		: T[K] extends {
					vars: infer V extends LiteralString[];
					fallbackValue: infer F extends
						| string
						| ((vars: Record<string, string>) => string);
				}
			? {
					vars: V;
					fallbackValue: F;
				}
			: never;
};

const defaultTranslations = {
	"ui.signOut": "Sign out",
	"ui.languageSwitch.aria-label": "Change language",
	"ui.languageSwitch.noResults": "No results",
	"ui.languageSwitch.placeholder": "Search language...",
	"home.title": "Home",
	"home.welcome": "Welcome to the dashboard",
} as const satisfies PluginTranslations;

type I18nConfig<P extends Plugin[]> = {
	[lang: string]: {
		displayName?: string;
		icon?: string | ComponentType<{ className?: string }>;
		translations?: {
			[K in keyof UnionToIntersection<
				NormalizeTranslations<
					P[number]["translations"] | typeof defaultTranslations
				>
			>]?: UnionToIntersection<
				NormalizeTranslations<
					P[number]["translations"] | typeof defaultTranslations
				>
			>[K] extends { vars: infer V extends LiteralString[] }
				? string | ((vars: Record<V[number], string>) => string)
				: string;
		};
	};
};

export type SourceOptions<P extends Plugin[], T extends I18nConfig<P>> = {
	/**
	 * @default "/dashboard"
	 */
	basePath?: string;
	authClient: ReturnType<
		typeof createAuthClient<{
			plugins: [
				ReturnType<typeof adminClient<any>>,
				ReturnType<typeof dashboardClientPlugin>,
			];
		}>
	>;
	/**
	 * @default ["admin"]
	 */
	adminRoles?: string[];
	plugins?: P;
	i18n?: T;
	defaultLanguage?: keyof T & string;
};

type AllOptional<T> = keyof T extends never
	? false
	: T extends Required<T>
		? false
		: {} extends T
			? true
			: false;

export const isTranslatableString = (
	value: unknown,
): value is TranslatableString => {
	return (
		value instanceof String && typeof (value as any).translateTo === "function"
	);
};

export type TranslatableString = String & {
	translateTo: (
		lang: string,
		// TODO: infer
		vars?: Record<string, string>,
	) => string;
};

export const createSource = <
	const P extends Plugin[],
	T extends I18nConfig<P>,
	O extends SourceOptions<P, T>,
>(
	options: O & {
		plugins?: P;
		i18n?: T;
	},
) => {
	const { basePath = "/dashboard", plugins = [] } = options ?? {};
	const adminRoles = options.adminRoles ?? ["admin"];
	const fallbackTranslations = [
		defaultTranslations,
		...plugins.map(({ translations }) => translations ?? {}),
	].reduce((acc, value) => {
		return {
			...acc,
			...Object.fromEntries(
				Object.entries(value).map(([label, value]) => {
					if (typeof value === "string") {
						return [label, value];
					}

					return [label, value.fallbackValue];
				}),
			),
		};
	}, {} as any) as Record<
		string,
		string | ((vars: Record<string, string>) => string)
	>;
	const translations = Object.fromEntries(
		Object.entries(options.i18n ?? {}).map(([lang, config]) => {
			return [
				lang,
				{
					...fallbackTranslations,
					...config.translations,
				},
			];
		}),
	) as Record<
		string,
		Record<string, string | ((vars: Record<string, string>) => string)>
	>;
	const languages = Object.entries(options.i18n ?? {}).reduce(
		(acc, value) => {
			const [lang, { translations, ...rest }] = value;
			return [
				...acc,
				{
					id: lang,
					...rest,
				},
			];
		},
		[] as ({ id: string } & Omit<I18nConfig<any>[string], "translations">)[],
	);
	type TOptions<
		K extends keyof UnionToIntersection<
			NormalizeTranslations<P[number]["translations"]>
		>,
	> = {
		language?: string;
	} & (UnionToIntersection<
		NormalizeTranslations<P[number]["translations"]>
	>[K] extends { vars: infer V extends readonly string[] }
		? string[] extends V
			? { vars?: Record<string, string> }
			: { vars: Record<V[number], string> }
		: { vars?: Record<string, string> });
	const t = <
		K extends keyof UnionToIntersection<
			NormalizeTranslations<P[number]["translations"]>
		> &
			string,
	>(
		key: K,
		...[opts]: AllOptional<TOptions<K>> extends false
			? [TOptions<K>]
			: [TOptions<K>?]
	) => {
		const language = opts?.language ?? options.defaultLanguage;
		let label: any;

		if (language) {
			label = translations[language]?.[key];
		}

		label ??= fallbackTranslations[key];

		let result: string = label;
		if (typeof label === "function") {
			if (!opts?.vars) {
				throw new Error(`Missing vars for \`${String(key)}\``);
			}
			result = label(opts?.vars);
		}

		const withTranslateTo = new String(result) as TranslatableString;

		withTranslateTo.translateTo = (
			lang: string,
			vars?: Record<string, string>,
		) => {
			let l: any = translations[lang]?.[key] ?? fallbackTranslations[key];

			if (typeof l === "function") {
				return l(vars);
			}

			return l;
		};

		return withTranslateTo;
	};
	const routes: PluginPage[] = [
		{
			title: t("home.title" as any, {} as any),
			slug: "/",
			component: lazy(() => import("./home")),
		},
		...plugins.flatMap((plugin) => {
			return typeof plugin.routes === "function"
				? plugin.routes({
						t: t as any,
					})
				: plugin.routes;
		}),
	];

	const groupedPages = groupPages(routes);

	const getPage = (slugs: Slugs) => {
		const normalizedSlugs = normalizeSlug(slugs);

		const page = routes.find(
			(route) => route.slug === (normalizedSlugs?.join("/") ?? "/"),
		);

		if (!page) {
			return null;
		}

		return page satisfies PluginPage;
	};

	const normalizeSlug = (slugs: Slugs) => {
		return !slugs || slugs.length === 0
			? undefined
			: Array.isArray(slugs)
				? slugs
				: [slugs];
	};

	const generateMetadata = (
		slugs: Slugs,
		options?: {
			language?: string;
			vars?: {
				title?: Record<string, string>;
				description?: Record<string, string>;
			};
		},
	) => {
		const normalizedSlugs = normalizeSlug(slugs);

		const page = routes.find(
			(route) => route.slug === (normalizedSlugs?.join("/") ?? "/"),
		);

		if (!page) {
			return {};
		}

		let title = page.title;
		let description = page.description;
		if (options?.language) {
			if (isTranslatableString(title)) {
				title = title.translateTo(options.language, options.vars?.title);
				console.log({ title });
			}
			if (isTranslatableString(description)) {
				description = description.translateTo(
					options.language,
					options.vars?.description,
				);
			}
		}
		title = title.toString();
		description = description?.toString();

		return {
			title,
			description,
		};
	};

	return {
		options,
		fallbackTranslations,
		translations,
		t,
		languages,
		basePath,
		authClient: options.authClient,
		generateMetadata,
		normalizeSlug,
		getPage,
		routes,
		groupedPages,
		adminRoles,
		// nextjs
		prefetch: async (
			auth?: ReturnType<
				typeof betterAuth<{
					plugins: [ReturnType<typeof admin<any>>, ReturnType<DashboardPlugin>];
				}>
			>,
		) => {
			const headers = await (await import("next/headers")).headers();
			const session = auth
				? await auth.api.getSession({
						headers,
					})
				: (
						await options.authClient.getSession({
							fetchOptions: {
								headers,
							},
						})
					).data;

			const { redirect } = await import("next/navigation");

			if (!session?.user) {
				// TODO: get path from config
				throw redirect("/sign-in");
			}

			if (!session?.user.role || !adminRoles.includes(session.user.role)) {
				// TODO: Show forbidden page
				throw redirect("/sign-in");
			}

			return {
				session,
			};
		},
		dehydrate: (
			data: {
				session?: {
					session: Session & Record<string, any>;
					user: User & Record<string, any>;
				} | null;
			} & Record<string, any>,
		) => {
			return JSON.parse(JSON.stringify(data));
		},
		// @tanstack/react-router
		loader: (async ({ request }) => {
			const session = await options.authClient.getSession({
				fetchOptions: {
					headers: request.headers,
				},
			});

			const { redirect } = await import("react-router");

			if (!session.data?.session) {
				// TODO: get path from config
				throw redirect("/sign-in");
			}

			if (
				!session.data.user.role ||
				!adminRoles.includes(session.data.user.role)
			) {
				// TODO: Show forbidden page
				throw redirect("/sign-in");
			}

			return {
				session: session.data,
			};
		}) satisfies LoaderFunction,
	};
};

export type Source = ReturnType<typeof createSource<any, any, any>>;
