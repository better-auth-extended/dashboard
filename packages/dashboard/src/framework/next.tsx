"use client";

import type { Framework } from ".";
import {
	useParams,
	usePathname,
	useRouter,
	useSearchParams,
} from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export const nextProvider = (() => {
	return {
		usePathname,
		useRouter,
		useParams,
		useSearchParams,
		Link: Link as ReturnType<Framework>["Link"],
		Image: Image as ReturnType<Framework>["Image"],
	};
}) satisfies Framework;
