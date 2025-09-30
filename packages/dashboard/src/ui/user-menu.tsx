"use client";

import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { useDashboard, useDashboardPage } from "../dashboard";
import { useRouter } from "../framework";
import { I18nLabel } from "./i18n-label";

export const UserMenu = () => {
	const { components, icons, authClient } = useDashboard();
	const { session } = useDashboardPage();
	const {
		useSidebar,
		SidebarMenu,
		SidebarMenuItem,
		SidebarMenuButton,
		Avatar,
		AvatarImage,
		AvatarFallback,
		DropdownMenu,
		DropdownMenuTrigger,
		DropdownMenuContent,
		DropdownMenuSeparator,
		DropdownMenuGroup,
		DropdownMenuItem,
	} = components;
	const { isMobile } = useSidebar();
	const { ChevronsUpDown, LogOut } = icons;
	const router = useRouter();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar>
								<AvatarImage
									src={session?.user.image ?? undefined}
									alt={session?.user.name}
								/>
								<AvatarFallback>
									{session?.user.name.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">
									{session?.user.name}
								</span>
								<span className="truncate text-xs">{session?.user.email}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="size-8 rounded-lg">
									<AvatarImage
										src={session?.user.image ?? undefined}
										alt={session?.user.name}
									/>
									<AvatarFallback className="rounded-lg">
										{session?.user.name.charAt(0).toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">
										{session?.user.name}
									</span>
									<span className="truncate text-xs">
										{session?.user.email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => {
								authClient.signOut({
									fetchOptions: {
										onSuccess: () => {
											// TODO: Get from config
											router.push("/sign-in");
										},
									},
								});
							}}
						>
							<LogOut />
							<I18nLabel label="ui.signOut" />
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};
