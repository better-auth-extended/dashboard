"use client";

import {
	useCallback,
	useMemo,
	useRef,
	useState,
	useSyncExternalStore,
	useTransition,
} from "react";
import type { ZodType } from "zod";
import { createWatchStore } from "../utils/create-watch-store";

export type FormErrors<T> = Partial<Record<"root" | keyof T, string>>;

type ValidateMode = "onChange" | "onBlur" | "onSubmit" | "onTouched" | "all";

export type FieldState = {
	isTouched: boolean;
	isValidated: boolean;
	isDirty: boolean;
};

export type FormState<T extends Record<string, any>> = {
	isDirty: boolean;
	dirtyFields: Partial<Record<keyof T & string, boolean>>;
	touchedFields: Partial<Record<keyof T & string, boolean>>;
	isValid: boolean;
	isSubmitting: boolean;
	isValidating: boolean;
};

export type UseFormOptions<T extends Record<string, any>> = {
	defaultValues?: Partial<T>;
	schema: ZodType<T>;
	mode?: ValidateMode;
	reValidateMode?: "onChange" | "onBlur" | "onSubmit";
	onSubmit: (values: T) => void | Promise<void>;
};

export type UseFormResult<T extends Record<string, any>> = ReturnType<
	typeof useForm<T>
>;

export function useForm<T extends Record<string, any>>({
	defaultValues,
	schema,
	mode = "onSubmit",
	reValidateMode = "onChange",
	onSubmit,
}: UseFormOptions<T> & { schema: ZodType<T> }) {
	const [values, _setValues] = useState<Partial<T>>(defaultValues ?? {});
	const watchStore = useRef(createWatchStore(values));
	const [errors, setErrors] = useState<FormErrors<T>>({});
	const [isSubmitting, startSubmitting] = useTransition();
	const [isValidating, startValidating] = useTransition();
	const [fieldStates, setFieldStates] = useState<
		Partial<Record<keyof T & string, FieldState>>
	>({});

	const setValues: typeof _setValues = (next) =>
		_setValues((prev) => {
			const resolved = typeof next === "function" ? next(prev) : next;

			setFieldStates((prevStates) => {
				const nextStates: typeof prevStates = { ...prevStates };
				for (const key of Object.keys(resolved) as (keyof T & string)[]) {
					const prevValue = prev[key];
					nextStates[key] = {
						...prevStates[key],
						isDirty: resolved[key] !== defaultValues?.[key],
					};
				}
				return nextStates;
			});

			watchStore.current = createWatchStore(resolved);
			watchStore.current.notify();
			return resolved;
		});

	const dirtyFields = useMemo(() => {
		const dirty: Partial<Record<keyof T & string, boolean>> = {};
		for (const key in fieldStates) {
			dirty[key as keyof T & string] = fieldStates[key]?.isDirty ?? false;
		}
		return dirty;
	}, [fieldStates]);

	const touchedFields = useMemo(() => {
		const touched: Partial<Record<keyof T & string, boolean>> = {};
		for (const key in fieldStates) {
			touched[key as keyof T & string] = fieldStates[key]?.isTouched ?? false;
		}
		return touched;
	}, [fieldStates]);

	const isDirty = useMemo(
		() => Object.values(dirtyFields).some(Boolean),
		[dirtyFields],
	);

	const refs = useRef<
		Partial<Record<keyof T & string, HTMLInputElement | HTMLTextAreaElement>>
	>({});

	const validate = (vals?: Partial<T>) =>
		new Promise<boolean>((resolve) => {
			startValidating(async () => {
				const currentValues = vals ?? values;
				const allKeys = new Set([
					...Object.keys(currentValues),
					...Object.keys(defaultValues ?? {}),
				]);
				const result = await schema.safeParseAsync(currentValues);

				if (!result.success) {
					const newErrors: FormErrors<T> = {};
					for (const issue of result.error.issues) {
						if (issue.path.length === 0) newErrors.root = issue.message;
						else {
							const key = issue.path[0] as keyof T;
							newErrors[key] = issue.message;
							allKeys.add(String(key));
						}
					}
					setErrors(newErrors);

					setFieldStates((prev) => {
						const next: typeof prev = { ...prev };
						for (const k of allKeys) {
							const prevState = prev[k as keyof T & string] ?? {
								isTouched: false,
								isValidated: false,
								isDirty: false,
							};
							next[k as keyof T & string] = {
								...prevState,
								isValidated: true,
								isDirty:
									currentValues[k as keyof T & string] !==
									defaultValues?.[k as keyof T & string],
							};
						}
						return next;
					});

					return resolve(false);
				}

				setErrors({});
				setFieldStates((prev) => {
					const next: typeof prev = { ...prev };
					for (const k of allKeys) {
						const prevState = prev[k as keyof T & string] ?? {
							isTouched: false,
							isValidated: false,
							isDirty: false,
						};
						next[k as keyof T & string] = {
							...prevState,
							isValidated: true,
							isDirty:
								currentValues[k as keyof T & string] !==
								defaultValues?.[k as keyof T & string],
						};
					}
					return next;
				});

				resolve(true);
			});
		});

	const shouldValidate = (field: keyof T & string, event: ValidateMode) => {
		const { isValidated } = fieldStates[field] ?? {};
		if (mode === "all") return true;
		if (!isValidated) return mode === event || mode === "onTouched";
		return event === reValidateMode;
	};

	const register = <N extends keyof T & string>(name: N) => ({
		name,
		ref: (el: HTMLInputElement | HTMLTextAreaElement | null) => {
			if (el) refs.current[name] = el;
		},
		value: values[name],
		onChange: (
			e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | T[N],
		) => {
			const val = typeof e === "object" && "target" in e ? e.target.value : e;
			setValues((prev) => ({ ...prev, [name]: val }));

			if (shouldValidate(name, "onChange"))
				validate({ ...values, [name]: val });
		},
		onBlur: () => {
			setFieldStates((prev) => ({
				...prev,
				[name]: { ...prev[name], isTouched: true },
			}));

			if (
				shouldValidate(name, "onBlur") ||
				(mode === "onTouched" && !fieldStates[name]?.isValidated)
			)
				validate(values);
		},
	});

	const handleSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			const isValid = await validate();
			if (isValid && !isSubmitting) {
				startSubmitting(async () => {
					await onSubmit(values as T);
				});
			}
		},
		[onSubmit],
	);

	const watch = <F extends (keyof T & string) | undefined>(field?: F) =>
		useSyncExternalStore(watchStore.current.subscribe, () => {
			const snapshot = watchStore.current.getSnapshot();
			return field ? snapshot[field] : snapshot;
		}) as F extends keyof T & string ? T[F] : T;

	const formState: FormState<T> = {
		isDirty,
		dirtyFields,
		touchedFields,
		isValid: Object.keys(errors).length === 0,
		isSubmitting,
		isValidating,
	};

	const control = {
		setValue: (name: keyof T & string, value: any, shouldValidate = false) => {
			setValues((prev) => ({ ...prev, [name]: value }));
			if (shouldValidate) validate({ ...values, [name]: value });
		},
		getValue: (name: keyof T & string) => values[name],
		reset: (next?: Partial<T>) => {
			setValues(next ?? defaultValues ?? {});
			setErrors({});
			setFieldStates({});
		},
		focus: (name: keyof T & string) => refs.current[name]?.focus(),
	};

	return {
		values,
		errors,
		register,
		handleSubmit,
		setValues,
		formState,
		fieldStates,
		control,
		watch,
		validate,
	};
}
