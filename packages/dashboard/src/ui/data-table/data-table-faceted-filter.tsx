"use client";

import type { Column } from "@tanstack/react-table";
import { useDashboard } from "../../dashboard";
import { cn } from "../../utils/cn";

export type DataTableFacetedFilterProps<TData, TValue> = {
	column?: Column<TData, TValue>;
	title?: string;
	options: {
		label: string;
		value: string;
		icon?: React.ComponentType<{ className?: string }>;
	}[];
};

export const DataTableFacetedFilter = <TData, TValue>({
	column,
	title,
	options,
}: DataTableFacetedFilterProps<TData, TValue>) => {
	const { components, icons, t } = useDashboard();
	const {
		Command,
		CommandEmpty,
		CommandGroup,
		CommandInput,
		CommandItem,
		CommandList,
		CommandSeparator,
		Popover,
		PopoverContent,
		PopoverTrigger,
		Separator,
		Button,
		Badge,
	} = components;
	const { Check, CirclePlus } = icons;
	const selectedValues = new Set(column?.getFilterValue() as string[]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" size="sm" className="h-8 border-dashed">
					<CirclePlus className="size-3.5 text-muted-foreground" />
					{title}
					{selectedValues?.size > 0 && (
						<>
							<Separator orientation="vertical" className="h-4 mx-2" />
							<Badge variant="secondary" className="px-1 lg:hidden">
								{selectedValues.size}
							</Badge>
							<div className="hidden space-x-1 lg:flex">
								{selectedValues.size > 2 ? (
									<Badge variant="secondary" className="px-1 rounded-sm">
										{t("ui.dataTable.facetedFilter.selected", {
											size: selectedValues.size,
										})}
									</Badge>
								) : (
									options
										.filter((option) => selectedValues.has(option.value))
										.map((option) => (
											<Badge
												variant="secondary"
												key={option.value}
												className="px-1 rounded-sm"
											>
												{option.label}
											</Badge>
										))
								)}
							</div>
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0" align="start">
				<Command>
					<CommandInput placeholder={title} />
					<CommandList>
						<CommandEmpty>
							{t("ui.dataTable.facetedFilter.noResults")}
						</CommandEmpty>
						<CommandGroup>
							{options.map((option) => {
								const isSelected = selectedValues.has(option.value);
								return (
									<CommandItem
										key={option.value}
										onSelect={() => {
											if (isSelected) {
												selectedValues.delete(option.value);
											} else {
												selectedValues.add(option.value);
											}
											const filterValues = Array.from(selectedValues);
											column?.setFilterValue(
												filterValues.length ? filterValues : undefined,
											);
										}}
									>
										<div
											className={cn(
												"border-primary flex size-4 items-center justify-center rounded-sm border",
												isSelected
													? "bg-priamry text-primary-foreground"
													: "opacity-50 [&_svg]:invisible",
											)}
										>
											<Check className="text-foreground size-3" />
										</div>
										{option.icon && (
											<option.icon className="size-4 text-muted-foreground" />
										)}
										<span>{option.label}</span>
									</CommandItem>
								);
							})}
						</CommandGroup>
						{selectedValues.size > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={() => column?.setFilterValue(undefined)}
										className="justify-center text-center"
									>
										{t("ui.dataTable.facetedFilter.clear")}
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
DataTableFacetedFilter.displayName = "DataTableFacetedFilter";
