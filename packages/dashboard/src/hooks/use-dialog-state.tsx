"use client";

import { useState } from "react";

export function useDialogState<T extends string | boolean>(
	initialState: T | null = null,
) {
	const [open, _setOpen] = useState<T | null>(initialState);

	const setOpen = (str: T | null) =>
		_setOpen((prev) => (prev === str ? null : str));

	return [open, setOpen] as const;
}
