import type { TranslatableString } from "../source";
import type { Components } from "./components";

type LiteralString = "" | (string & Record<never, never>);

export type PageComponent = (props: {
	components: Components;
	page: PluginPage;
}) => React.JSX.Element;

export type PluginPage = (
	| {
			id?: string;
			group?: never;
	  }
	| {
			id?: never;
			group?: string;
	  }
) & {
	hidden?: boolean;
	title: string | TranslatableString;
	description?: string | TranslatableString;
	slug: string;
	component: React.LazyExoticComponent<PageComponent>;
};

export type PluginRoutesCtx = {
	t: (
		key: string,
		opts?: {
			vars?: Record<string, string | number | null | undefined>;
			language?: string;
		},
	) => string;
};

export type PluginTranslations = {
	[key: string]:
		| string
		| {
				vars: LiteralString[];
				fallbackValue:
					| string
					| ((
							vars: Record<string, string | number | null | undefined>,
					  ) => string);
		  };
};

export type Plugin = {
	id: LiteralString;
	routes: PluginPage[] | ((ctx: PluginRoutesCtx) => PluginPage[]);
	translations?: PluginTranslations;
};
