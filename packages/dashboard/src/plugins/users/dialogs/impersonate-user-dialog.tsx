"use client";

import type { UserWithRole } from "better-auth/plugins/admin";
import type { SharedDialogProps } from "../../../types/helper";
import { useDashboard } from "../../../dashboard";
import { useTransition } from "react";
import { LoaderIcon } from "../../../ui/loader-icon";

export type ImpersonateUserDialogProps = SharedDialogProps & {
	currentRow: UserWithRole;
};

export const ImpersonateUserDialog = ({
	open,
	onOpenChange,
	currentRow,
}: ImpersonateUserDialogProps) => {
	const {
		t,
		authClient,
		components: {
			Dialog,
			DialogContent,
			DialogHeader,
			DialogTitle,
			DialogDescription,
			DialogFooter,
			DialogClose,
			Button,
		},
	} = useDashboard();

	const [loading, startTransition] = useTransition();

	const handleSubmit = () => {
		startTransition(async () => {
			await authClient.admin.impersonateUser({
				userId: currentRow.id,
				fetchOptions: {
					onSuccess: () => {
						onOpenChange(false);
						// TODO: Redirect?
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
					<DialogTitle>{t("users.dialogs.impersonateUser.title")}</DialogTitle>
					<DialogDescription>
						{t("users.dialogs.impersonateUser.description", {
							email: currentRow.email,
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
						{loading && <LoaderIcon />}
						{t("users.dialogs.impersonateUser.impersonate")}
					</Button>
					<DialogClose asChild>
						<Button variant="secondary" className="w-full">
							{t("users.dialogs.impersonateUser.cancel")}
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
ImpersonateUserDialog.displayName = "ImpersonateUserDialog";
