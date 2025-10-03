"use client";

import type { UserWithRole } from "better-auth/plugins/admin";
import type { SharedDialogProps } from "../../../types/helper";
import { useDashboard } from "../../../dashboard";
import { useTransition } from "react";

export type RemoveUserDialogProps = SharedDialogProps & {
	currentRow: UserWithRole;
};

export const RemoveUserDialog = ({
	open,
	onOpenChange,
	currentRow,
}: RemoveUserDialogProps) => {
	const {
		t,
		authClient,
		icons: { LoaderCircle },
		components: {
			Dialog,
			DialogContent,
			DialogHeader,
			DialogTitle,
			DialogDescription,
			DialogClose,
			DialogFooter,
			Button,
		},
	} = useDashboard();
	const [loading, startTransition] = useTransition();

	const handleSubmit = () => {
		startTransition(async () => {
			await authClient.admin.removeUser({
				userId: currentRow.id,
				fetchOptions: {
					onSuccess: () => {
						onOpenChange(false);
						// TODO: Show success toast
					},
					onError: () => {
						// TODO: Show error toast
					},
				},
			});
		});
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-sm">
				<DialogHeader>
					<DialogTitle>{t("users.dialogs.removeUser.title")}</DialogTitle>
					<DialogDescription>
						{t("users.dialogs.removeUser.description", {
							email: currentRow.name,
							name: currentRow.name,
						})}
					</DialogDescription>
				</DialogHeader>

				<DialogFooter className="grid grid-cols-2 gap-3">
					<Button
						className="w-full order-1"
						onClick={handleSubmit}
						disabled={loading}
					>
						{loading && (
							<LoaderCircle className="animate-spin repeat-infinite" />
						)}
						{t("users.dialogs.removeUser.remove")}
					</Button>
					<DialogClose asChild>
						<Button variant="secondary" className="w-full">
							{t("users.dialogs.removeUser.cancel")}
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
RemoveUserDialog.displayName = "RemoveUserDialog";
