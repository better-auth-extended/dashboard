"use client";

import type { UserWithRole } from "better-auth/plugins/admin";
import { useDashboard } from "../../../dashboard";
import type { SharedDialogProps } from "../../../types/helper";
import { useForm, type UseFormResult } from "../../../hooks/use-form";
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
import { useUsers } from "../users-provider";
import { useCallback, useEffect, useRef, useState } from "react";
import {
	useFileUpload,
	type FileUploadActions,
	type FileUploadState,
} from "../../../hooks/use-file-upload";
import { createContext } from "../../../utils/create-context";
import { getCroppedImg, type Area } from "../../../utils/cropper";
import { cn } from "../../../utils/cn";
import { UserImage } from "../../../ui/user-image";

const editUserSchema = z.object({
	image: z.union([z.url(), z.base64url()]),
	name: z.string().min(2).max(128),
	role: z.string(),
	email: z.email(),
});

const EditUserContent = ({
	form,
}: {
	form: UseFormResult<z.infer<typeof editUserSchema>>;
}) => {
	const {
		maxSize,
		maxSizeMB,
		fileUploader: [
			// TODO: Handle errors
			{ isDragging, errors },
			{
				handleDragEnter,
				handleDragLeave,
				handleDragOver,
				handleDrop,
				openFileDialog,
				getInputProps,
			},
		],
	} = EditUserDialogContext.use();
	const finalImageUrl = form.watch("image");
	const handleRemoveFinalImage = () => {
		if (finalImageUrl && finalImageUrl.startsWith("blob:")) {
			URL.revokeObjectURL(finalImageUrl);
		}
		form.setValues((prev) => ({
			...prev,
			image: "",
		}));
	};

	const {
		source,
		t,
		icons: { LoaderCircle, X, Upload },
		components: {
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
		},
	} = useDashboard();

	return (
		<div
			className="p-6 space-y-4 relative"
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
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
						<FormField control={form.control} name="image">
							{({ field }) => (
								<FormItem>
									<FormLabel>
										{t("users.dialogs.editUser.fields.image.label")}
									</FormLabel>
									<div className="flex items-center gap-3">
										<UserImage
											user={{
												name: form.values.name ?? "",
												image: field.value !== "" ? field.value : undefined,
											}}
											className="size-14"
											fallbackProps={{
												className: "text-lg",
											}}
											role="button"
											onClick={openFileDialog}
											aria-label={
												field.value
													? t("users.dialogs.editUser.fields.image.changeImage")
													: t("users.dialogs.editUser.fields.image.uploadImage")
											}
										/>
										<div className="flex flex-col justify-around gap-1">
											<div className="flex items-center gap-2">
												<FormControl>
													<Button
														type="button"
														variant="outline"
														size="sm"
														onClick={openFileDialog}
														aria-label={
															field.value
																? t(
																		"users.dialogs.editUser.fields.image.changeImage",
																	)
																: t(
																		"users.dialogs.editUser.fields.image.uploadImage",
																	)
														}
													>
														<Upload />
														{field.value
															? t(
																	"users.dialogs.editUser.fields.image.changeImage",
																)
															: t(
																	"users.dialogs.editUser.fields.image.uploadImage",
																)}
													</Button>
												</FormControl>
												{field.value !== "" && (
													<Button
														variant="ghost"
														size="icon"
														onClick={handleRemoveFinalImage}
														className="size-8"
														aria-label={t(
															"users.dialogs.editUser.fields.image.removeImage.aria-label",
														)}
													>
														<X />
													</Button>
												)}
											</div>
											<p className="text-xs text-muted-foreground leading-tight">
												{t("users.dialogs.editUser.fields.image.description", {
													maxSizeMB,
													maxSize,
												})}
											</p>
										</div>
									</div>
									<input
										{...getInputProps()}
										className="sr-only"
										aria-label={t(
											"users.dialogs.editUser.fields.image.aria-label",
										)}
										tabIndex={-1}
									/>
									<FormMessage />
								</FormItem>
							)}
						</FormField>

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
			{isDragging && (
				<div className="absolute grid inset-0 z-50 p-2.5">
					<div className="flex flex-col justify-center items-center text-center rounded-md bg-card border-2 border-dashed">
						<div
							className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
							aria-hidden="true"
						>
							<Upload className="size-4 opacity-60" />
						</div>
						<div className="mb-1.5 text-sm font-medium">
							{t("users.dialogs.editUser.fields.image.dropArea.title")}
						</div>
						<p className="text-muted-foreground text-xs">
							{t("users.dialogs.editUser.fields.image.dropArea.description", {
								maxSize,
								maxSizeMB,
							})}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

const CropImageContent = ({
	form,
}: {
	form: UseFormResult<z.infer<typeof editUserSchema>>;
}) => {
	const {
		setTab,
		fileUploader: [{ files }, { removeFile }],
	} = EditUserDialogContext.use();
	const {
		t,
		icons: { ArrowLeft, ZoomOut, ZoomIn },
		components: {
			DialogHeader,
			DialogTitle,
			DialogDescription,
			DialogFooter,
			Button,
			Cropper,
			CropperImage,
			CropperCropArea,
			CropperDescription,
			Slider,
		},
	} = useDashboard();

	const previewUrl = files[0]?.preview || null;
	const fileId = files[0]?.id;

	const finalImageUrl = form.watch("image");
	const prevFileIdRef = useRef<string | undefined | null>(null);

	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
	const [zoom, setZoom] = useState(1);

	const handleCropChange = useCallback((pixels: Area | null) => {
		setCroppedAreaPixels(pixels);
	}, []);

	const handleApply = async () => {
		if (!previewUrl || !fileId || !croppedAreaPixels) {
			console.log("Missing data for apply:", {
				previewUrl,
				fileId,
				croppedAreaPixels,
			});
			if (fileId) {
				removeFile(fileId);
				setCroppedAreaPixels(null);
			}
			return;
		}

		try {
			const croppedBlob = await getCroppedImg(previewUrl, croppedAreaPixels);
			if (!croppedBlob) {
				throw new Error("Failed to generate cropped image blob.");
			}

			const newFinalUrl = URL.createObjectURL(croppedBlob);
			if (finalImageUrl.startsWith("blob:")) {
				URL.revokeObjectURL(finalImageUrl);
			}

			form.setValues({
				...form.values,
				image: newFinalUrl,
			});
			setTab("form");
		} catch (err) {
			console.error("Error during apply:", err);
			setTab("form");
		}
	};

	useEffect(() => {
		if (fileId && fileId !== prevFileIdRef.current) {
			setCroppedAreaPixels(null);
			setZoom(1);
		}
		prevFileIdRef.current = fileId;
	}, [fileId]);

	return (
		<>
			<DialogDescription className="sr-only">
				{t("users.dialogs.editUser.cropImage.description")}
			</DialogDescription>
			<DialogHeader className="contents space-y-0 text-left">
				<DialogTitle className="flex items-center justify-between border-b p-4 text-base">
					<div className="flex items-center gap-2">
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="-my-1 opacity-60"
							onClick={() => setTab("form")}
							aria-label={t(
								"users.dialogs.editUser.cropImage.cancel.aria-label",
							)}
						>
							<ArrowLeft aria-hidden="true" />
						</Button>
						<span>{t("users.dialogs.editUser.cropImage.title")}</span>
					</div>
					<Button
						className="-my-1"
						onClick={handleApply}
						disabled={!previewUrl}
						autoFocus
					>
						{t("users.dialogs.editUser.cropImage.apply")}
					</Button>
				</DialogTitle>
			</DialogHeader>
			{previewUrl && (
				<Cropper
					className="h-96 sm:h-120"
					image={previewUrl}
					zoom={zoom}
					onCropChange={handleCropChange}
					onZoomChange={setZoom}
				>
					<CropperDescription />
					<CropperImage />
					<CropperCropArea />
				</Cropper>
			)}
			<DialogFooter className="border-t px-4 py-6">
				<div className="mx-auto flex w-full max-w-80 items-center gap-4">
					<ZoomOut className="shrink-0 size-4 opacity-60" aria-hidden="true" />
					<Slider
						defaultValue={[1]}
						value={[zoom]}
						min={1}
						max={3}
						step={0.1}
						onValueChange={(value) => setZoom(value[0]!)}
						aria-label={t(
							"users.dialogs.editUser.cropImage.zoomSlider.aria-label",
						)}
					/>
					<ZoomIn className="shrink-0 size-4 opacity-60" aria-hidden="true" />
				</div>
			</DialogFooter>
		</>
	);
};

type EditUserDialogTabs = "form" | "cropper";

type EditUserDialogContextType = {
	tab: EditUserDialogTabs;
	setTab: React.Dispatch<React.SetStateAction<EditUserDialogTabs>>;
	fileUploader: [FileUploadState, FileUploadActions];
	maxSizeMB: number;
	maxSize: number;
};

const EditUserDialogContext = createContext<EditUserDialogContextType>(
	"EditUserDialogContext",
	null!,
);

export type EditUserDialogProps = SharedDialogProps & {
	currentRow: UserWithRole;
};

export const EditUserDialog = ({
	open,
	onOpenChange,
	currentRow,
}: EditUserDialogProps) => {
	const [tab, setTab] = useState<"form" | "cropper">("form");
	const { components, authClient } = useDashboard();
	const { Dialog, DialogContent } = components;
	const { setData } = useUsers();
	// TODO: get maxSize from config
	const maxSizeMB = 5;
	const maxSize = maxSizeMB * 1024 * 1024;

	const fileUploader = useFileUpload({
		accept: "image/*",
		multiple: false,
		maxSize,
	});

	useEffect(() => {
		if (fileUploader[0].files.length > 0) {
			setTab("cropper");
		}
	}, [fileUploader[0].files]);

	const form = useForm({
		schema: editUserSchema,
		defaultValues: {
			image: currentRow.image ?? "",
			email: currentRow.email,
			name: currentRow.name,
			role: currentRow.role,
		},
		onSubmit: async (values) => {
			const hasEmailChanged = values.email !== currentRow.email;
			// TODO: Handle file uploads
			await authClient.admin.updateUser({
				userId: currentRow.id,
				data: {
					...values,
					image: values.image !== "" ? values.image : null,
					emailVerified: hasEmailChanged ? false : undefined,
				},
				fetchOptions: {
					onError: (ctx) => {
						// TODO: Show error toast
					},
					onSuccess: (ctx) => {
						onOpenChange(false);
						setData((prev) => {
							const idx = prev.users.findIndex((u) => u.id === ctx.data.id);
							if (idx === -1) {
								return prev;
							}

							const users = [...prev.users];
							users[idx] = {
								...users[idx],
								...ctx.data,
							};

							return {
								...prev,
								users,
							};
						});
						// TODO: Show success toast
					},
				},
			});
		},
	});

	const finalImageUrl = form.watch("image");

	useEffect(() => {
		const currentFinalUrl = finalImageUrl;
		return () => {
			if (currentFinalUrl && currentFinalUrl.startsWith("blob:")) {
				URL.revokeObjectURL(currentFinalUrl);
			}
		};
	}, [finalImageUrl]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<EditUserDialogContext.Provider
				value={{
					tab,
					setTab,
					fileUploader,
					maxSizeMB,
					maxSize,
				}}
			>
				<DialogContent
					onOpenAutoFocus={(e) => e.preventDefault()}
					showCloseButton={tab !== "cropper"}
					className={cn(
						"sm:max-w-140 p-0 focus:outline-none",
						tab === "cropper" && "gap-0",
					)}
				>
					{tab === "form" && <EditUserContent form={form} />}
					{tab === "cropper" && <CropImageContent form={form} />}
				</DialogContent>
			</EditUserDialogContext.Provider>
		</Dialog>
	);
};
EditUserDialog.displayName = "EditUserDialog";
