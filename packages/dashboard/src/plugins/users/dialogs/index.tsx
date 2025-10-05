"use client";

import { useUsers } from "../users-provider";
import { BanUserDialog } from "./ban-user-dialog";
import { CreateUserDialog } from "./create-user-dialog";
import { EditUserDialog } from "./edit-user-dialog";
import { ImpersonateUserDialog } from "./impersonate-user-dialog";
import { RemoveUserDialog } from "./remove-user-dialog";

export const UsersDialogs = () => {
	const { open, setOpen, currentRow, setCurrentRow } = useUsers();

	const resetCurrentRow = () => {
		setTimeout(() => {
			setCurrentRow(null);
		}, 300);
	};

	return (
		<>
			<CreateUserDialog
				open={open === "create"}
				onOpenChange={() => {
					setOpen("create");
				}}
			/>

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

					<BanUserDialog
						key={`user-ban-${currentRow.id}`}
						open={open === "ban"}
						onOpenChange={() => {
							setOpen("ban");
							resetCurrentRow();
						}}
						currentRow={currentRow}
					/>

					<RemoveUserDialog
						key={`user-remove-${currentRow.id}`}
						open={open === "remove"}
						onOpenChange={() => {
							setOpen("remove");
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
