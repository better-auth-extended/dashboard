import { useState } from "react";
import { useDashboard } from "../dashboard";

export const LanguageSwitch = () => {
	const { components, icons, source, t, language, setLanguage } =
		useDashboard();
	const {
		Button,
		Popover,
		PopoverTrigger,
		PopoverContent,
		Command,
		CommandInput,
		CommandList,
		CommandEmpty,
		CommandGroup,
		CommandItem,
	} = components;
	const { Globe, Check } = icons;
	const [open, setOpen] = useState(false);

	if (source.languages.length === 0) {
		return null;
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					role="combobox"
					aria-expanded={open}
					aria-label={t("ui.languageSwitch.aria-label")}
				>
					<Globe />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="p-0 w-[200px]"
				sideOffset={4}
				collisionPadding={8}
			>
				<Command>
					<CommandInput placeholder={t("ui.languageSwitch.placeholder")} />
					<CommandList>
						<CommandEmpty>{t("ui.languageSwitch.noResults")}</CommandEmpty>
						<CommandGroup>
							{source.languages.map((lang) => (
								<CommandItem
									key={lang.id}
									value={lang.id}
									onSelect={(lang) => {
										setLanguage(lang);
										setOpen(false);
									}}
									keywords={lang.displayName ? [lang.displayName] : []}
								>
									{lang.icon &&
										(typeof lang.icon === "string" ? (
											<span>{lang.icon}</span>
										) : (
											<lang.icon className="size-4" />
										))}
									{lang.displayName ?? lang.id}
									<Check
										className={`ml-auto ${(language ?? source.options.defaultLanguage) === lang.id ? "opacity-100" : "opacity-0"}`}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
LanguageSwitch.displayName = "LanguageSwitch";
