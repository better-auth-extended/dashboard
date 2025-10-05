"use client";

import type { UserWithRole } from "better-auth/plugins/admin";
import { createContext } from "../../utils/create-context";
import { useDialogState } from "../../hooks/use-dialog-state";
import { useCallback, useEffect, useState, useTransition } from "react";
import type {
	ColumnFiltersState,
	PaginationState,
	SortingState,
} from "@tanstack/react-table";
import { useDashboard } from "../../dashboard";
import { useDebounceCallback } from "../../hooks/use-debounce-callback";
import { useAbortController } from "../../hooks/use-abort-controller";

type UsersDialogType = "create" | "edit" | "impersonate" | "ban" | "remove";

type UsersState = {
	users: UserWithRole[];
	total: number;
};

type UsersContextType = {
	open: UsersDialogType | null;
	setOpen: (open: UsersDialogType | null) => void;
	currentRow: UserWithRole | null;
	setCurrentRow: React.Dispatch<React.SetStateAction<UserWithRole | null>>;
	data: UsersState;
	setData: React.Dispatch<React.SetStateAction<UsersState>>;
	refetch: () => void;
	pagination: PaginationState;
	setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
	sorting: SortingState;
	setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
	columnFilters: ColumnFiltersState;
	setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
	globalFilter: string;
	setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
	loading: boolean;
};

const UsersContext = createContext<UsersContextType>("UsersContext", null!);

export const UsersProvider = ({ children }: { children?: React.ReactNode }) => {
	const { authClient } = useDashboard();
	const [open, setOpen] = useDialogState<UsersDialogType>(null);
	const [currentRow, setCurrentRow] = useState<UserWithRole | null>(null);
	const [data, setData] = useState<UsersState>({ users: [], total: 0 });
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 20,
	});
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [loading, startTransition] = useTransition();
	const { getSignal, abort } = useAbortController();

	const searchValue = globalFilter?.trim().toLowerCase();

	const fetchUsers = useCallback(() => {
		abort();
		const signal = getSignal();
		startTransition(async () => {
			const activeFilter = columnFilters[0];

			const result = await authClient.admin.listUsers({
				query: {
					searchValue,
					limit: pagination.pageSize,
					offset: pagination.pageIndex * pagination.pageSize,
					sortBy: sorting[0]?.id,
					sortDirection: sorting[0]?.desc ? "desc" : "asc",
					// TODO:
					// filterOperator: ,
					// filterField: activeFilter?.id,
					// filterValue: activeFilter?.value,
				},
				fetchOptions: {
					signal,
					onError: (context) => {
						// TODO: Show error toast
					},
				},
			});

			if (result.data?.users) {
				setData(result.data);
			}
		});
	}, [authClient, setData, pagination, sorting, columnFilters, searchValue]);
	const debouncedFetch = useDebounceCallback(fetchUsers, 400);

	useEffect(() => {
		debouncedFetch();
	}, [pagination, sorting, columnFilters, searchValue]);

	return (
		<UsersContext.Provider
			value={{
				open,
				setOpen,
				currentRow,
				setCurrentRow,
				data,
				setData,
				loading,
				refetch: fetchUsers,
				pagination,
				setPagination,
				sorting,
				setSorting,
				columnFilters,
				setColumnFilters,
				globalFilter,
				setGlobalFilter,
			}}
		>
			{children}
		</UsersContext.Provider>
	);
};
UsersProvider.displayName = "UsersProvider";

export const useUsers = () => UsersContext.use();
