"use client";

import { Fragment, memo, Suspense } from "react";
import { useDashboard } from "../dashboard";
import { AppSidebar } from "./app-sidebar";
import { Link } from "../framework";
import { getBreadcrumb } from "../utils/get-breadcrumbs";
import type { PluginPage } from "../types";
import { LanguageSwitch } from "./language-switch";

const RenderPage = memo(({ page }: { page: PluginPage | null }) => {
	const { t, components, icons, source, translate } = useDashboard();
	if (!page) {
		return null;
	}

	const {
		SidebarInset,
		SidebarTrigger,
		Separator,
		Breadcrumb,
		BreadcrumbList,
		BreadcrumbItem,
		BreadcrumbPage,
		BreadcrumbLink,
		BreadcrumbSeparator,
	} = components;

	const Component = page.component;

	return (
		<SidebarInset className="@container/content">
			<header className="flex py-2.5 shrink-0 items-center gap-2 border-b px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator
					orientation="vertical"
					className="mr-2 data-[orientation=vertical]:h-4"
				/>
				<Breadcrumb>
					<BreadcrumbList>
						{getBreadcrumb(page, source).map(
							({ title, href }, i, { length }) => {
								const isLast = i === length - 1;

								title = translate(title);

								return (
									<Fragment key={i}>
										<BreadcrumbItem
											className={!isLast ? "max-md:hidden" : undefined}
										>
											{!isLast ? (
												<BreadcrumbLink href={href} asChild>
													<Link href={href}>{title}</Link>
												</BreadcrumbLink>
											) : (
												<BreadcrumbPage>{title}</BreadcrumbPage>
											)}
										</BreadcrumbItem>
										{!isLast && (
											<BreadcrumbSeparator className="max-md:hidden" />
										)}
									</Fragment>
								);
							},
						)}
					</BreadcrumbList>
				</Breadcrumb>

				<div className="ms-auto">
					<LanguageSwitch />
				</div>
			</header>
			<Suspense fallback={<p>{t("ui.state.loading.aria-label")}</p>}>
				<Component page={page} components={components} icons={icons} />
			</Suspense>
		</SidebarInset>
	);
});
RenderPage.displayName = "RenderPage";

export const DashboardUI = memo(({ page }: { page: PluginPage }) => {
	const { translate } = useDashboard();

	return (
		<>
			<AppSidebar />
			<RenderPage
				page={{
					...page,
					title: translate(page.title),
					description: page.description
						? translate(page.description)
						: undefined,
				}}
			/>
		</>
	);
});
DashboardUI.displayName = "DashboardUI";
