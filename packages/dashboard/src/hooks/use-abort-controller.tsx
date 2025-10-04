"use client";

import { useCallback, useEffect, useRef } from "react";

export function useAbortController() {
	const controllerRef = useRef<AbortController>(null);

	const getSignal = useCallback((): AbortSignal => {
		controllerRef.current?.abort();
		const controller = new AbortController();
		controllerRef.current = controller;
		return controller.signal;
	}, []);

	const abort = useCallback((reason: string = "Aborted") => {
		controllerRef.current?.abort(new DOMException(reason, "AbortError"));
		controllerRef.current = null;
	}, []);

	useEffect(() => {
		return () => {
			controllerRef.current?.abort(
				new DOMException("Component unmounted", "AbortError"),
			);
		};
	}, []);

	return { getSignal, abort };
}
