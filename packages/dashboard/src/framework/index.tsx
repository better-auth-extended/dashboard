"use client";

import React from "react";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import { createContext } from "../utils/create-context";

export interface ImageProps extends Omit<React.ComponentProps<"img">, "src"> {
	sizes?: string;
	src?: string | StaticImport;
	priority?: boolean;
}

export interface LinkProps extends React.ComponentProps<"a"> {
	prefetch?: boolean;
}

export interface Router {
	push: (url: string) => void;
	refresh: () => void;
}

export type Framework = () => {
	usePathname: () => string;
	useParams: () => Record<string, string | string[]>;
	useSearchParams: () => URLSearchParams;
	useRouter: () => Router;

	Link?: React.ComponentType<LinkProps>;
	Image?: React.ComponentType<ImageProps>;
};

const FrameworkContext = createContext<ReturnType<Framework>>(
	"FrameworkContext",
	null!,
);

export function FrameworkProvider({
	Link,
	Image,
	useRouter,
	useParams,
	usePathname,
	useSearchParams,
	children,
}: React.PropsWithChildren<ReturnType<Framework>>) {
	const framework = React.useMemo(
		() => ({
			usePathname,
			useRouter,
			useParams,
			useSearchParams,
			Link,
			Image,
		}),
		[usePathname, useRouter, useParams, useSearchParams, Link, Image],
	);

	return (
		<FrameworkContext.Provider value={framework}>
			{children}
		</FrameworkContext.Provider>
	);
}

export function usePathname() {
	return FrameworkContext.use().usePathname();
}

export function useRouter() {
	return FrameworkContext.use().useRouter();
}

export function useParams() {
	return FrameworkContext.use().useParams();
}

export function useSearchParams() {
	return FrameworkContext.use().useSearchParams();
}

export function Image(props: ImageProps) {
	const { Image } = FrameworkContext.use();
	if (!Image) {
		const { src, alt, priority, ...rest } = props;

		return (
			<img
				alt={alt}
				src={src as string}
				fetchPriority={priority ? "high" : "auto"}
				{...rest}
			/>
		);
	}

	return <Image {...props} />;
}

export function Link(props: LinkProps) {
	const { Link } = FrameworkContext.use();
	if (!Link) {
		const { href, prefetch: _, ...rest } = props;
		return <a href={href} {...rest} />;
	}

	return <Link {...props} />;
}
