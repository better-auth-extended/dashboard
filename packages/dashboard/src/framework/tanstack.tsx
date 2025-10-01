import { useMemo } from "react";
import type { Framework } from ".";
import {
	useParams,
	Link,
	useRouter,
	useLocation,
} from "@tanstack/react-router";

export const tanstackProvider = (() => {
	return {
		Link({ href, prefetch, children, ...props }) {
			return (
				<Link to={href} preload={prefetch ? "intent" : false} {...props}>
					{children}
				</Link>
			);
		},
		usePathname() {
			return useLocation().pathname;
		},
		useRouter() {
			const router = useRouter();

			return useMemo(
				() => ({
					push(url) {
						void router.navigate({
							href: url,
						});
					},
					refresh() {
						router.invalidate();
					},
				}),
				[router],
			);
		},
		useParams() {
			return useParams({ strict: false });
		},
		useSearchParams() {
			const { state } = useRouter();

			return new URLSearchParams(state.location.searchStr);
		},
	};
}) satisfies Framework;
