export function createWatchStore<T extends Record<string, any>>(values: T) {
	let listeners: (() => void)[] = [];
	return {
		subscribe: (listener: () => void) => {
			listeners.push(listener);
			return () => {
				listeners = listeners.filter((l) => l !== listener);
			};
		},
		notify: () => {
			for (const l of listeners) l();
		},
		getSnapshot: () => values,
	};
}
