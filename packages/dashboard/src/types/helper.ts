import type {
	betterAuth,
	BetterAuthClientPlugin,
	BetterAuthPlugin,
	LiteralString,
} from "better-auth";
import type { adminClient } from "better-auth/client/plugins";
import type { admin } from "better-auth/plugins/admin";
import type { createAuthClient } from "better-auth/react";
import type { Plugin } from "./plugin";

export type SharedDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export type Auth<P extends BetterAuthPlugin[] = []> = ReturnType<
	typeof betterAuth<{
		plugins: [...P, ReturnType<typeof admin<any>>];
	}>
>;

export type AuthClient<P extends BetterAuthClientPlugin[] = []> = ReturnType<
	typeof createAuthClient<{
		plugins: [...P, ReturnType<typeof adminClient<any>>];
	}>
>;

export type NormalizeTranslations<T extends Plugin["translations"]> = {
	[K in keyof T]: T[K] extends string
		? {
				fallbackValue: string;
			}
		: T[K] extends {
					vars: infer V extends LiteralString[];
					fallbackValue: infer F extends
						| string
						| ((
								vars: Record<string, string | number | null | undefined>,
						  ) => string);
				}
			? {
					vars: V;
					fallbackValue: F;
				}
			: never;
};
