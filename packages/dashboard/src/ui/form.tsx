"use client";

import { useId, useMemo } from "react";
import type { FormFieldType, UseFormResult } from "../hooks/use-form";
import { createContext } from "../utils/create-context";
import type { Root as LabelPrimitiveRoot } from "@radix-ui/react-label";
import { cn } from "../utils/cn";
import { useDashboard } from "../dashboard";
import { Slot } from "@radix-ui/react-slot";

export type FormContextType<T extends Record<string, any> = any> =
	UseFormResult<T>;

const FormContext = createContext<FormContextType>("FormContext", null!);

export const useFormContext = <T extends Record<string, any>>() =>
	FormContext.use() as FormContextType<T>;

export type FormProps<T extends Record<string, any> = Record<string, any>> =
	UseFormResult<T> & {
		children?: React.ReactNode;
	};

export const Form = <T extends Record<string, any>>({
	children,
	...form
}: FormProps<T>) => {
	return <FormContext.Provider value={form}>{children}</FormContext.Provider>;
};
Form.displayName = "Form";

type FormFieldContextType = { id: string; name: string };
const FormFieldContext = createContext<FormFieldContextType>(
	"FormFieldContext",
	null!,
);

export const useFormField = () => {
	const { id, name } = FormFieldContext.use();
	const { fieldStates, errors } = useFormContext();

	return {
		id,
		name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		error: errors[name],
		...(fieldStates[name] ?? {}),
	};
};

export type FormFieldProps<
	T extends Record<string, any>,
	N extends keyof T & string,
> = {
	name: N;
	control?: UseFormResult<T>["control"];
	children?: (ctx: {
		id: string;
		form: FormContextType<T>;
		field: FormFieldType<T, N>;
	}) => React.ReactNode;
};

export const FormField = <
	T extends Record<string, any>,
	N extends keyof T & string,
>({
	name,
	control,
	children,
}: FormFieldProps<T, N> & {
	name: N;
	control?: UseFormResult<T>["control"];
}) => {
	const id = useId();
	const form = useFormContext<T>();

	const field = useMemo(() => form.register(name), [form.register, name]);

	const providerValue = useMemo(
		() => ({ name, control: control ?? form.control, id }),
		[name, control, form.control, id],
	);

	return (
		<FormFieldContext.Provider value={providerValue}>
			{children?.({ id, form, field })}
		</FormFieldContext.Provider>
	);
};
FormField.displayName = "FormField";

export const FormItem = ({
	className,
	...props
}: React.ComponentProps<"div">) => {
	return (
		<div
			data-slot="form-item"
			className={cn("grid gap-2", className)}
			{...props}
		/>
	);
};
FormItem.displayName = "FormItem";

export const FormLabel = ({
	className,
	...props
}: React.ComponentProps<typeof LabelPrimitiveRoot>) => {
	const {
		components: { Label },
	} = useDashboard();
	const { error, formItemId } = useFormField();
	return (
		<Label
			data-slot="form-label"
			data-error={!!error}
			className={cn("data-[error=true]:text-destructive", className)}
			htmlFor={formItemId}
			{...props}
		/>
	);
};
FormLabel.displayName = "FormLabel";

export const FormControl = ({
	...props
}: React.ComponentProps<typeof Slot>) => {
	const { error, formItemId, formDescriptionId, formMessageId } =
		useFormField();
	return (
		<Slot
			data-slot="form-control"
			id={formItemId}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	);
};
FormControl.displayName = "FormControl";

export const FormDescription = ({
	className,
	...props
}: React.ComponentProps<"p">) => {
	const { formDescriptionId } = useFormField();
	return (
		<p
			data-slot="form-description"
			id={formDescriptionId}
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
};
FormDescription.displayName = "FormDescription";

export const FormMessage = ({
	className,
	...props
}: React.ComponentProps<"p">) => {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error ?? "") : props.children;
	if (!body) {
		return null;
	}
	return (
		<p
			data-slot="form-message"
			id={formMessageId}
			className={cn("text-destructive text-sm", className)}
			{...props}
		>
			{body}
		</p>
	);
};
FormMessage.displayName = "FormMessage";
