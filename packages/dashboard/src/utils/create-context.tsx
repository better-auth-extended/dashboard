"use client";

import React from "react";

export function createContext<T>(name: string, v?: T) {
	const Context = React.createContext(v);

	return {
		Provider: (props: { value: T; children: React.ReactNode }) => {
			return (
				<Context.Provider value={props.value}>
					{props.children}
				</Context.Provider>
			);
		},
		use: (errorMessage?: string): Exclude<T, undefined | null> => {
			const value = React.useContext(Context);

			if (!value) {
				throw new Error(
					errorMessage ?? `Provider of ${name} is required but missing.`,
				);
			}

			return value as Exclude<T, undefined | null>;
		},
	};
}
