"use client";

import type { UserWithRole } from "better-auth/plugins/admin";
import type { SharedDialogProps } from "../../../types/helper";
import { useDashboard } from "../../../dashboard";
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
import { toSeconds } from "../../../utils/time";
import { useEffect, useRef, useState, useTransition } from "react";
import { NumericInput } from "../../../ui/numeric-input";

const BanUserContent = ({ onOpenChange, currentRow }: BanUserDialogProps) => {
	const {
		t,
		authClient,
		icons: { LoaderCircle },
		components: {
			DialogHeader,
			DialogTitle,
			DialogDescription,
			DialogFooter,
			DialogClose,
			Button,
			Input,
			Select,
			SelectTrigger,
			SelectValue,
			SelectContent,
			SelectGroup,
			SelectSeparator,
			SelectItem,
		},
	} = useDashboard();

	const form = useForm({
		schema: z.object({
			banReason: z.string(),
			duration: z.number().or(z.null()),
		}),
		onSubmit: async (values) => {
			await authClient.admin.banUser({
				userId: currentRow.id,
				banReason: values.banReason !== "" ? values.banReason : undefined,
				banExpiresIn: values.duration ?? undefined,
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
		},
		defaultValues: {
			banReason: "",
			duration: null,
		},
	});

	return (
		<>
			<DialogHeader>
				<DialogTitle>{t("users.dialogs.banUser.title")}</DialogTitle>
				<DialogDescription>
					{t("users.dialogs.banUser.description", {
						email: currentRow.email,
						name: currentRow.name,
					})}
				</DialogDescription>
			</DialogHeader>

			<Form {...form}>
				<form onSubmit={form.handleSubmit} className="space-y-6">
					<FormField control={form.control} name="banReason">
						{({ field }) => (
							<FormItem>
								<FormLabel>
									{t("users.dialogs.banUser.fields.reason.label")}
								</FormLabel>
								<FormControl>
									<Input
										placeholder={t(
											"users.dialogs.banUser.fields.reason.placeholder",
										)}
										autoComplete="off"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					</FormField>

					<FormField control={form.control} name="duration">
						{({ field, id }) => {
							const [rawValue, setRawValue] = useState("permanent");
							const [customValue, setCustomValue] = useState(1);
							const [customValueType, setCustomValueType] = useState<
								"seconds" | "minutes" | "hours" | "days" | "weeks"
							>("days");
							const customInputRef = useRef<HTMLInputElement>(null);

							useEffect(() => {
								if (rawValue === "permanent") {
									field.onChange(null);
								} else if (rawValue === "custom") {
									field.onChange(toSeconds({ [customValueType]: customValue }));
									const timeout = setTimeout(() => {
										customInputRef.current?.focus();
									}, 150);
									return () => clearTimeout(timeout);
								} else {
									const duration = parseInt(rawValue, 10);
									field.onChange(duration);
								}
							}, [rawValue, customValue, customValueType]);

							return (
								<FormItem>
									<FormLabel>
										{t("users.dialogs.banUser.fields.duration.label")}
									</FormLabel>
									<div className="grow">
										<Select defaultValue={rawValue} onValueChange={setRawValue}>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														placeholder={t(
															"users.dialogs.banUser.fields.duration.placeholder",
														)}
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectGroup>
													<SelectItem value={"permanent"}>
														{t(
															"users.dialogs.banUser.fields.duration.permanent",
														)}
													</SelectItem>
													{(
														[
															{
																value: 1,
																type: "days",
															},
															{
																value: 1,
																type: "weeks",
															},
															{
																value: 4,
																type: "weeks",
															},
														] as const
													).map((config, i) => {
														const value = toSeconds({
															[config.type]: config.value,
														});
														return (
															<SelectItem key={i} value={`${value}`}>
																{t(
																	"users.dialogs.banUser.fields.duration.preset",
																	config,
																)}
															</SelectItem>
														);
													})}
												</SelectGroup>
												<SelectSeparator />
												<SelectItem
													id={`${id}-custom-value-item`}
													value="custom"
													aria-controls={`${id}-custom-input-container`}
												>
													{t("users.dialogs.banUser.fields.duration.custom")}
												</SelectItem>
											</SelectContent>
										</Select>

										<div
											role="region"
											id={`${id}-custom-input-container`}
											aria-labelledby={`${id}-custom-value-item`}
											className="grid duration-150 transition-all ease-in-out data-[state=collapsed]:grid-rows-[0fr] data-[state=collapsed]:opacity-0 data-[state=expanded]:grid-rows-[1fr] data-[state=expanded]:opacity-100"
											data-state={
												rawValue === "custom" ? "expanded" : "collapsed"
											}
											inert={rawValue !== "custom"}
										>
											<div className="pointer-events-none -m-2 overflow-hidden p-2">
												<div className="pointer-events-auto mt-3 flex items-start gap-2">
													<NumericInput
														ref={customInputRef}
														id={`${id}-custom-input`}
														min={1}
														value={customValue}
														onChange={(e) => {
															const value = parseInt(e.target.value, 10);
															if (!isNaN(value)) {
																setCustomValue(value);
															}
														}}
														autoComplete="off"
													/>
													<Select
														defaultValue={customValueType}
														onValueChange={(v: typeof customValueType) =>
															setCustomValueType(v)
														}
													>
														<SelectTrigger>
															<SelectValue />
														</SelectTrigger>
														<SelectContent>
															{(
																[
																	"seconds",
																	"minutes",
																	"hours",
																	"days",
																	"weeks",
																] as const
															).map((type) => (
																<SelectItem key={type} value={type}>
																	{t(
																		"users.dialogs.banUser.fields.duration.custom.typeName",
																		{ type },
																	)}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</div>
											</div>
										</div>
									</div>
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
							{form.formState.isSubmitting && (
								<LoaderCircle className="animate-spin repeat-infinite" />
							)}
							{t("users.dialogs.banUser.ban")}
						</Button>
						<DialogClose asChild>
							<Button type="button" variant="secondary" className="w-full">
								{t("users.dialogs.banUser.cancel")}
							</Button>
						</DialogClose>
					</DialogFooter>
				</form>
			</Form>
		</>
	);
};
BanUserContent.displayName = "BanUserContent";

const UnbanUserContent = ({ currentRow, onOpenChange }: BanUserDialogProps) => {
	const {
		t,
		authClient,
		icons: { LoaderCircle },
		components: {
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
			await authClient.admin.unbanUser({
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
		<>
			<DialogHeader>
				<DialogTitle>{t("users.dialogs.unbanUser.title")}</DialogTitle>
				<DialogDescription>
					{t("users.dialogs.unbanUser.description", {
						email: currentRow.email,
						name: currentRow.name,
					})}
				</DialogDescription>
			</DialogHeader>

			<DialogFooter className="grid grid-cols-2 gap-3">
				<Button
					onClick={handleSubmit}
					disabled={loading}
					className="w-full order-1"
				>
					{loading && <LoaderCircle className="animate-spin repeat-infinite" />}
					{t("users.dialogs.unbanUser.unban")}
				</Button>
				<DialogClose asChild>
					<Button variant="secondary" className="w-full">
						{t("users.dialogs.unbanUser.cancel")}
					</Button>
				</DialogClose>
			</DialogFooter>
		</>
	);
};
UnbanUserContent.displayName = "UnbanUserContent";

export type BanUserDialogProps = SharedDialogProps & {
	currentRow: UserWithRole;
};

export const BanUserDialog = (props: BanUserDialogProps) => {
	const {
		components: { Dialog, DialogContent },
	} = useDashboard();

	return (
		<Dialog open={props.open} onOpenChange={props.onOpenChange}>
			<DialogContent className="sm:max-w-sm">
				{props.currentRow.banned ? (
					<UnbanUserContent {...props} />
				) : (
					<BanUserContent {...props} />
				)}
			</DialogContent>
		</Dialog>
	);
};
BanUserDialog.displayName = "BanUserDialog";
