"use client";

import { z } from "zod";
import { useDashboard } from "../../../dashboard";
import { useForm } from "../../../hooks/use-form";
import type { SharedDialogProps } from "../../../types/helper";
import { useUsers } from "../users-provider";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../../ui/form";
import { PasswordInput } from "../../../ui/password-input";
import { MultiSelect, type Option } from "../../../ui/multiselect";
import { useEffect, useState } from "react";
import { sortAdminRolesFn } from "../../../utils/sort-admin-roles";
import { LoaderIcon } from "../../../ui/loader-icon";

const CreateUserContent = ({ onOpenChange }: SharedDialogProps) => {
	const {
		t,
		authClient,
		source,
		components: {
			DialogHeader,
			DialogTitle,
			DialogDescription,
			DialogFooter,
			DialogClose,
			Button,
			Input,
		},
	} = useDashboard();
	const { refetch } = useUsers();

	const form = useForm({
		schema: z.object({
			name: z.string().min(2),
			email: z.email(),
			password: z.string(),
			role: z.string().array(),
		}),
		onSubmit: async (values) => {
			await authClient.admin.createUser({
				...values,
				fetchOptions: {
					onSuccess: () => {
						onOpenChange(false);
						refetch();
						// TODO: Show success toast
					},
					onError: () => {
						// TODO: Show error toast
					},
				},
			});
		},
		defaultValues: {
			name: "",
			email: "",
			password: "",
			role: source.options.defaultRole
				? Array.isArray(source.options.defaultRole)
					? source.options.defaultRole
					: [source.options.defaultRole]
				: undefined,
		},
	});

	return (
		<>
			<DialogHeader>
				<DialogTitle>{t("users.dialogs.createUser.title")}</DialogTitle>
				<DialogDescription>
					{t("users.dialogs.createUser.description")}
				</DialogDescription>
			</DialogHeader>

			<Form {...form}>
				<form onSubmit={form.handleSubmit} className="space-y-6">
					<FormField control={form.control} name="name">
						{({ field }) => (
							<FormItem>
								<FormLabel>
									{t("users.dialogs.createUser.fields.name.label")}
								</FormLabel>
								<FormControl>
									<Input
										placeholder={t(
											"users.dialogs.createUser.fields.name.placeholder",
										)}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					</FormField>

					<FormField control={form.control} name="email">
						{({ field }) => (
							<FormItem>
								<FormLabel>
									{t("users.dialogs.createUser.fields.email.label")}
								</FormLabel>
								<FormControl>
									<Input
										placeholder={t(
											"users.dialogs.createUser.fields.email.placeholder",
										)}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					</FormField>

					<FormField control={form.control} name="password">
						{({ field }) => (
							<FormItem>
								<FormLabel>
									{t("users.dialogs.createUser.fields.password.label")}
								</FormLabel>
								<FormControl>
									<PasswordInput
										placeholder={t(
											"users.dialogs.createUser.fields.password.placeholder",
										)}
										autoComplete="off"
										autoCorrect="off"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					</FormField>

					<FormField control={form.control} name="role">
						{({ field }) => {
							const options = Object.entries(source.roles)
								.sort(sortAdminRolesFn())
								.map(([role, config]) => {
									// TODO: icons
									const displayName = t("roleName", { role });
									return {
										label: displayName,
										value: role,
										keywords: [displayName],
									} satisfies Option;
								});

							const defaultValue = options.find(
								({ value }) => value === field.value?.[0],
							);

							const [value, setValue] = useState<Option[]>(
								defaultValue ? [defaultValue] : [],
							);

							useEffect(() => {
								field.onChange(value.map(({ value }) => value));
							}, [value]);

							return (
								<FormItem>
									<FormLabel>
										{t("users.dialogs.createUser.fields.role.label")}
									</FormLabel>
									<FormControl>
										<MultiSelect
											ref={field.ref}
											inputProps={{
												...field,
											}}
											commandProps={{
												label: t(
													"users.dialogs.createUser.fields.role.placeholder",
												),
											}}
											value={value}
											onChange={setValue}
											defaultOptions={options}
											placeholder={t(
												"users.dialogs.createUser.fields.role.placeholder",
											)}
											hideClearAllButton
											hidePlaceholderWhenSelected
											emptyIndicator={
												<p className="text-center text-sm">
													{t("users.dialogs.createUser.fields.role.noResults")}
												</p>
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					</FormField>

					<DialogFooter className="grid grid-cols-2 gap-3">
						<Button
							type="submit"
							className="w-full order-1"
							disabled={
								!form.formState.isDirty ||
								!form.formState.isValid ||
								form.formState.isSubmitting
							}
						>
							{form.formState.isSubmitting && <LoaderIcon />}
							{t("users.dialogs.createUser.create")}
						</Button>
						<DialogClose asChild>
							<Button variant="secondary" className="w-full">
								{t("users.dialogs.createUser.cancel")}
							</Button>
						</DialogClose>
					</DialogFooter>
				</form>
			</Form>
		</>
	);
};
CreateUserContent.displayName = "CreateUserContent";

export const CreateUserDialog = (props: SharedDialogProps) => {
	const {
		components: { Dialog, DialogContent },
	} = useDashboard();
	return (
		<Dialog {...props}>
			<DialogContent className="sm:max-w-md">
				<CreateUserContent {...props} />
			</DialogContent>
		</Dialog>
	);
};
CreateUserDialog.displayName = "CreateUserDialog";
