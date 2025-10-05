import { useDashboard, type DashboardProps } from "../dashboard";
import { Link, usePathname } from "../framework";
import { getPath } from "../utils/get-path";
import { UserMenu } from "./user-menu";

export const AppSidebar = ({
	options,
}: {
	options: DashboardProps["sidebar"];
}) => {
	const {
		enabled: headerEnabled,
		component: headerComponent,
		...headerProps
	} = {
		enabled: true,
		...options?.header,
	};
	const {
		basePath,
		source,
		translate,
		icons,
		components: {
			Sidebar,
			SidebarHeader,
			SidebarContent,
			SidebarGroup,
			SidebarGroupLabel,
			SidebarGroupContent,
			SidebarMenu,
			SidebarMenuButton,
			SidebarMenuItem,
			SidebarFooter,
			SidebarMenuAction,
			SidebarMenuSub,
			SidebarMenuSubItem,
			SidebarMenuSubButton,
			Collapsible,
			CollapsibleTrigger,
			CollapsibleContent,
		},
	} = useDashboard();
	const pathname = usePathname();

	return (
		<Sidebar>
			{!!headerComponent && headerEnabled ? (
				<SidebarHeader {...headerProps}>{headerComponent}</SidebarHeader>
			) : null}
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{source.groupedPages
								.filter((route) => !route.hidden)
								.map((route, i) => {
									const href = getPath(basePath, route.slug);
									const isActive = href === pathname;
									const hasActiveChild = route.children?.some((child) => {
										const childHref = getPath(basePath, child.slug);
										return childHref === pathname;
									});

									const defaultOpen = isActive || hasActiveChild;

									const children = route.children?.filter(
										(child) => !child.hidden,
									);

									const Icon = route.icon
										? typeof route.icon === "string"
											? icons[route.icon]
											: route.icon
										: undefined;

									return (
										<Collapsible key={i} asChild defaultOpen={defaultOpen}>
											<SidebarMenuItem>
												<SidebarMenuButton isActive={isActive} asChild>
													<Link href={href}>
														{Icon && <Icon className="size-4" />}
														<span>{translate(route.title)}</span>
													</Link>
												</SidebarMenuButton>
												{children?.length ? (
													<>
														<CollapsibleTrigger asChild>
															<SidebarMenuAction
																className="data-[state=open]:rotate-90"
																aria-label="Toggle"
															>
																<icons.ChevronRight />
															</SidebarMenuAction>
														</CollapsibleTrigger>
														<CollapsibleContent>
															<SidebarMenuSub>
																{children?.map((subItem, j) => {
																	const href = `${basePath}/${subItem.slug.startsWith("/") ? subItem.slug.slice(1) : subItem.slug}`;
																	const isActive = href === pathname;

																	const Icon = subItem.icon
																		? typeof subItem.icon === "string"
																			? icons[subItem.icon]
																			: subItem.icon
																		: undefined;

																	return (
																		<SidebarMenuSubItem key={j}>
																			<SidebarMenuSubButton
																				isActive={isActive}
																				asChild
																			>
																				<Link href={href}>
																					{Icon && <Icon className="size-4" />}
																					<span>
																						{translate(subItem.title)}
																					</span>
																				</Link>
																			</SidebarMenuSubButton>
																		</SidebarMenuSubItem>
																	);
																})}
															</SidebarMenuSub>
														</CollapsibleContent>
													</>
												) : null}
											</SidebarMenuItem>
										</Collapsible>
									);
								})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<UserMenu />
			</SidebarFooter>
		</Sidebar>
	);
};
AppSidebar.displayName = "AppSidebar";
