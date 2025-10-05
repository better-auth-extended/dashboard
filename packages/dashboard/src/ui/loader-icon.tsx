"use client";

import { useDashboard } from "../dashboard";
import type { IconComponent } from "../types";
import { cn } from "../utils/cn";

export const LoaderIcon: IconComponent = ({ className, ...props }) => {
	const {
		t,
		icons: { LoaderCircle },
	} = useDashboard();

	return (
		<LoaderCircle
			className={cn("size-4 animate-spin repeat-infinite", className)}
			role="status"
			aria-label={t("ui.state.loading.aria-label")}
			{...props}
		/>
	);
};
LoaderIcon.displayName = "LoaderIcon";
