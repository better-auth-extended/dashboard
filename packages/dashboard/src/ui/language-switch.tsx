import { useDashboard } from "../dashboard";

// TODO: Icons
// TODO: Convert to command menu
export const LanguageSwitch = () => {
	const { components, icons, source, t, language, setLanguage } =
		useDashboard();
	const {
		Button,
		DropdownMenu,
		DropdownMenuTrigger,
		DropdownMenuContent,
		DropdownMenuRadioGroup,
		DropdownMenuRadioItem,
	} = components;
	const { Globe } = icons;

	if (source.languages.length === 0) {
		return null;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					size="icon"
					variant="ghost"
					aria-label={t("ui.languageSwitch.aria-label")}
				>
					<Globe />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuRadioGroup
					value={language ?? source.options.defaultLanguage}
					onValueChange={setLanguage}
				>
					{source.languages.map((lang) => (
						<DropdownMenuRadioItem key={lang.id} value={lang.id}>
							{lang.displayName || lang.id}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
LanguageSwitch.displayName = "LanguageSwitch";
