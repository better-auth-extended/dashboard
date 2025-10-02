"use client";

import { useUsers } from "../users-provider";
import { EditUserDialog } from "./edit-user-dialog";
import { ImpersonateUserDialog } from "./impersonate-user-dialog";

export const UsersDialogs = () => {
	const { open, setOpen, currentRow, setCurrentRow } = useUsers();

	const resetCurrentRow = () => {
		setTimeout(() => {
			setCurrentRow(null);
		}, 300);
	};

	return (
		<>
			{currentRow && (
				<>
					<EditUserDialog
						key={`user-edit-${currentRow.id}`}
						open={open === "edit"}
						onOpenChange={() => {
							setOpen("edit");
							resetCurrentRow();
						}}
						currentRow={currentRow}
					/>

					<ImpersonateUserDialog
						key={`user-impersonate-${currentRow.id}`}
						open={open === "impersonate"}
						onOpenChange={() => {
							setOpen("impersonate");
							resetCurrentRow();
						}}
						currentRow={currentRow}
					/>
				</>
			)}
		</>
	);
};
UsersDialogs.displayName = "UsersDialogs";
