"use client";

import { useEffect, useRef } from "react";

export function useUnmount(func: () => void) {
	const funcRef = useRef(func);

	useEffect(
		() => () => {
			funcRef.current();
		},
		[],
	);
}
