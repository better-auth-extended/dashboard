"use client";

import { useDashboard } from "../dashboard";

export const ThemeSwitch = () => {
	const {
		t,
		icons: { Sun, Moon, Monitor },
		components: {
			DropdownMenu,
			DropdownMenuTrigger,
			DropdownMenuContent,
			DropdownMenuItem,
			Button,
		},
		theme,
		onThemeChange,
	} = useDashboard();

	if (!onThemeChange) {
		return null;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					size="icon"
					variant="outline"
					aria-label={t("ui.themeSwitch.aria-label")}
				>
					{theme === "dark" ? (
						<Moon aria-hidden="true" />
					) : (
						<Sun aria-hidden="true" />
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					onClick={() => {
						onThemeChange("light");
					}}
				>
					<Sun aria-hidden="true" />
					{t("ui.themeSwitch.light")}
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						onThemeChange("dark");
					}}
				>
					<Moon aria-hidden="true" />
					{t("ui.themeSwitch.dark")}
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						onThemeChange("system");
					}}
				>
					<Monitor aria-hidden="true" />
					{t("ui.themeSwitch.system")}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
ThemeSwitch.displayName = "ThemeSwitch";
