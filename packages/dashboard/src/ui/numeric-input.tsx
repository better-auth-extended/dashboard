"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useDashboard } from "../dashboard";
import { cn } from "../utils/cn";

export const NumericInput = forwardRef<
	HTMLInputElement,
	React.InputHTMLAttributes<HTMLInputElement> & {
		containerProps?: React.ComponentProps<"div">;
	}
>(
	(
		{
			className,
			onBeforeInput,
			onPaste,
			min,
			max,
			value,
			defaultValue,
			onChange,
			containerProps,
			...props
		},
		ref,
	) => {
		const {
			icons: { Plus, Minus },
			components: { Input, Button },
		} = useDashboard();

		const innerRef = useRef<HTMLInputElement>(null);
		useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

		const [internalValue, setInternalValue] = useState<string>(
			value !== undefined
				? String(value)
				: defaultValue !== undefined
					? String(defaultValue)
					: "",
		);

		const isControlled = value !== undefined;
		const actualValue = isControlled ? String(value ?? "") : internalValue;

		const updateValue = (newVal: string) => {
			if (!isControlled) {
				setInternalValue(newVal);
			}
			if (onChange) {
				const event = new Event("input", {
					bubbles: true,
				}) as unknown as React.ChangeEvent<HTMLInputElement>;
				Object.defineProperty(event, "target", {
					writable: false,
					value: innerRef.current,
				});
				onChange(event);
			}
		};

		const handleBeforeInput = (e: React.InputEvent<HTMLInputElement>) => {
			const val = e.nativeEvent.data || "";
			if (min !== undefined && Number(min) >= 0 && val === "-") {
				e.preventDefault();
			}
			onBeforeInput?.(e);
		};

		const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
			if (min !== undefined && Number(min) >= 0) {
				const paste = e.clipboardData.getData("text");
				if (paste.includes("-")) {
					e.preventDefault();
				}
			}
			onPaste?.(e);
		};

		const parseNumeric = (v: string) => {
			if (!v) return undefined;
			const n = Number(v);
			return Number.isFinite(n) ? n : undefined;
		};

		const currentNumber = parseNumeric(actualValue);

		const decreaseDisabled =
			min !== undefined && currentNumber !== undefined
				? currentNumber <= Number(min)
				: false;

		const increaseDisabled =
			max !== undefined && currentNumber !== undefined
				? currentNumber >= Number(max)
				: false;

		const doStep = (fn: "stepUp" | "stepDown") => {
			const el = innerRef.current;
			if (!el) return;
			el[fn]();
			updateValue(el.value);
			el.focus();
		};

		return (
			<div
				role="spinbutton"
				aria-valuemin={min !== undefined ? Number(min) : undefined}
				aria-valuemax={max !== undefined ? Number(max) : undefined}
				aria-valuenow={currentNumber !== undefined ? currentNumber : undefined}
				{...containerProps}
				className={cn("relative grow", containerProps?.className)}
			>
				<Input
					ref={innerRef}
					className={cn(
						"peer/number-input ps-9 pe-9 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield",
						className,
					)}
					type="number"
					inputMode="numeric"
					min={min}
					max={max}
					value={actualValue}
					onChange={(e) => {
						updateValue(e.target.value);
					}}
					onBeforeInput={handleBeforeInput}
					onPaste={handlePaste}
					{...props}
				/>

				<Button
					variant="ghost"
					size="icon"
					type="button"
					aria-label="Decrease value"
					tabIndex={-1}
					disabled={innerRef.current?.disabled || decreaseDisabled}
					onClick={() => doStep("stepDown")}
					className="text-muted-foreground absolute inset-y-1/2 -translate-y-1/2 start-0 ms-1 size-7"
				>
					<Minus className="size-3.5" aria-hidden="true" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					type="button"
					aria-label="Increase value"
					tabIndex={-1}
					disabled={innerRef.current?.disabled || increaseDisabled}
					onClick={() => doStep("stepUp")}
					className="text-muted-foreground absolute inset-y-1/2 -translate-y-1/2 end-0 me-1 size-7"
				>
					<Plus className="size-3.5" aria-hidden="true" />
				</Button>
			</div>
		);
	},
);

NumericInput.displayName = "NumericInput";
