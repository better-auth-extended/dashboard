import { useMemo } from "react";
import type { Framework } from ".";
import {
	Link,
	useLocation,
	useNavigate,
	useParams,
	useSearchParams,
	useRevalidator,
} from "react-router";

export const reactRouterProvider = (() => {
	return {
		usePathname() {
			return useLocation().pathname;
		},
		useParams() {
			return useParams() as Record<string, string | string[]>;
		},
		useSearchParams() {
			return useSearchParams()[0];
		},
		useRouter() {
			const navigate = useNavigate();
			const revalidator = useRevalidator();

			return useMemo(
				() => ({
					push(url) {
						navigate(url);
					},
					refresh() {
						revalidator.revalidate();
					},
				}),
				[navigate, revalidator],
			);
		},
		Link({ href, prefetch, children, ...props }) {
			return (
				<Link to={href!} prefetch={prefetch ? "intent" : "none"} {...props}>
					{children}
				</Link>
			);
		},
	};
}) satisfies Framework;
