import { useDashboard } from "../dashboard";
import { Link, usePathname } from "../framework";
import { getPath } from "../utils/get-path";
import { UserMenu } from "./user-menu";

export const AppSidebar = () => {
	const { basePath, source, components, icons, translate } = useDashboard();
	const {
		Sidebar,
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
	} = components;
	const { ChevronRight } = icons;
	const pathname = usePathname();

	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{source.groupedPages.map((route, i) => {
								const href = getPath(basePath, route.slug);
								const isActive = href === pathname;
								const hasActiveChild = route.children?.some((child) => {
									const childHref = getPath(basePath, child.slug);
									return childHref === pathname;
								});

								const defaultOpen = isActive || hasActiveChild;

								return (
									<Collapsible key={i} asChild defaultOpen={defaultOpen}>
										<SidebarMenuItem>
											<SidebarMenuButton isActive={isActive} asChild>
												<Link href={href}>{translate(route.title)}</Link>
											</SidebarMenuButton>
											{route.children?.length ? (
												<>
													<CollapsibleTrigger asChild>
														<SidebarMenuAction
															className="data-[state=open]:rotate-90"
															aria-label="Toggle"
														>
															<ChevronRight />
														</SidebarMenuAction>
													</CollapsibleTrigger>
													<CollapsibleContent>
														<SidebarMenuSub>
															{route.children?.map((subItem, j) => {
																const href = `${basePath}/${subItem.slug.startsWith("/") ? subItem.slug.slice(1) : subItem.slug}`;
																const isActive = href === pathname;

																return (
																	<SidebarMenuSubItem key={j}>
																		<SidebarMenuSubButton
																			isActive={isActive}
																			asChild
																		>
																			<Link href={href}>
																				<span>{translate(subItem.title)}</span>
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
