"use client";

import type { UserWithRole } from "better-auth/plugins/admin";
import { useDashboard } from "../../../dashboard";
import type { SharedDialogProps } from "../../../types/helper";
import { useForm } from "../../../hooks/use-form";
import z from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../../ui/form";
import { sortAdminRolesFn } from "../../../utils/sort-admin-roles";

export type EditUserDialogProps = SharedDialogProps & {
	currentRow: UserWithRole;
};

// TODO: edit user image
export const EditUserDialog = ({
	open,
	onOpenChange,
	currentRow,
}: EditUserDialogProps) => {
	const { components, icons, authClient, source, t } = useDashboard();
	const {
		Dialog,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogDescription,
		DialogFooter,
		DialogClose,
		Input,
		Button,
		Select,
		SelectTrigger,
		SelectValue,
		SelectContent,
		SelectItem,
	} = components;
	const { LoaderCircle } = icons;

	const form = useForm({
		schema: z.object({
			name: z.string().min(2).max(128),
			role: z.enum(Object.keys(source.roles)),
			email: z.email(),
		}),
		defaultValues: {
			email: currentRow.email,
			name: currentRow.name,
			role: currentRow.role,
		},
		onSubmit: async (values) => {
			// TODO: Optimistic update user?
			const hasEmailChanged = values.email !== currentRow.email;
			await authClient.admin.updateUser({
				userId: currentRow.id,
				data: {
					...values,
					emailVerified: hasEmailChanged ? false : undefined,
				},
				fetchOptions: {
					onError: (ctx) => {
						// TODO: Show error toast
					},
					onSuccess: () => {
						onOpenChange(false);
						// TODO: Show success toast
					},
				},
			});
		},
	});

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				onOpenAutoFocus={(e) => e.preventDefault()}
				className="w-md"
			>
				<DialogHeader>
					<DialogTitle>{t("users.dialogs.editUser.title")}</DialogTitle>
					<DialogDescription>
						{t("users.dialogs.editUser.description")}
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit} className="space-y-6">
						<div className="space-y-4">
							<div className="flex items-start gap-x-2">
								<FormField control={form.control} name="name">
									{({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>
												{t("users.dialogs.editUser.fields.name.label")}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={t(
														"users.dialogs.editUser.fields.name.placeholder",
													)}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								</FormField>

								<FormField control={form.control} name="role">
									{({ field }) => (
										<FormItem>
											<FormLabel>
												{t("users.dialogs.editUser.fields.role.label")}
											</FormLabel>
											<Select
												name={field.name}
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue
															placeholder={t(
																"users.dialogs.editUser.fields.role.placeholder",
															)}
														/>
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{Object.entries(source.roles)
														.sort(sortAdminRolesFn())
														.map(([role, config]) => (
															<SelectItem key={role} value={role}>
																{config.icon && <config.icon />}
																{t("roleName", { role })}
															</SelectItem>
														))}
												</SelectContent>
											</Select>
										</FormItem>
									)}
								</FormField>
							</div>

							<FormField control={form.control} name="email">
								{({ field }) => (
									<FormItem className="flex-1">
										<FormLabel>
											{t("users.dialogs.editUser.fields.email.label")}
										</FormLabel>
										<FormControl>
											<Input
												placeholder={t(
													"users.dialogs.editUser.fields.email.placeholder",
												)}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							</FormField>
						</div>

						<DialogFooter>
							<DialogClose asChild>
								<Button type="button" variant="secondary">
									{t("users.dialogs.editUser.cancel")}
								</Button>
							</DialogClose>
							<Button
								type="submit"
								disabled={
									!form.formState.isDirty ||
									!form.formState.isValid ||
									form.formState.isSubmitting
								}
							>
								{form.formState.isSubmitting && (
									<LoaderCircle className="animate-spin repeat-infinite" />
								)}
								{t("users.dialogs.editUser.save")}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
EditUserDialog.displayName = "EditUserDialog";
