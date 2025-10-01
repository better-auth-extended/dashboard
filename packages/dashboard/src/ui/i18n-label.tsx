"use client";

import { useDashboard } from "../dashboard";

export type I18nLabelProps = {
	vars?: Record<string, string | number | null | undefined>;
} & (
	| {
			label: string;
			children?: never;
	  }
	| {
			label?: never;
			children: string;
	  }
);

export const I18nLabel = (props: I18nLabelProps) => {
	const { t } = useDashboard();

	return t(props.label || props.children!, props.vars);
};
I18nLabel.displayName = "I18nLabel";
