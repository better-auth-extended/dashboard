"use client";

import type { UserWithRole } from "better-auth/plugins/admin";
import { createContext } from "../../utils/create-context";
import { useDialogState } from "../../hooks/use-dialog-state";
import { useState } from "react";

type UsersDialogType = "edit";

type UsersContextType = {
	open: UsersDialogType | null;
	setOpen: (open: UsersDialogType | null) => void;
	currentRow: UserWithRole | null;
	setCurrentRow: React.Dispatch<React.SetStateAction<UserWithRole | null>>;
};

const UsersContext = createContext<UsersContextType>("UsersContext", null!);

export const UsersProvider = ({ children }: { children?: React.ReactNode }) => {
	const [open, setOpen] = useDialogState<UsersDialogType>(null);
	const [currentRow, setCurrentRow] = useState<UserWithRole | null>(null);

	return (
		<UsersContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
			{children}
		</UsersContext.Provider>
	);
};
UsersProvider.displayName = "UsersProvider";

export const useUsers = () => UsersContext.use();
