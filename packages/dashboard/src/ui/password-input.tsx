"use client";

import { forwardRef, useState } from "react";
import { cn } from "../utils/cn";
import { useDashboard } from "../dashboard";

export const PasswordInput = forwardRef<
	HTMLInputElement,
	Omit<React.ComponentProps<"input">, "type"> & {
		containerProps?: Omit<React.ComponentProps<"div">, "children">;
	}
>(({ containerProps, className, ...props }, ref) => {
	const {
		t,
		icons: { Eye, EyeOff },
		components: { Input },
	} = useDashboard();
	const [visible, setVisible] = useState(false);

	return (
		<div
			{...containerProps}
			className={cn("relative", containerProps?.className)}
		>
			<Input
				className={cn("pe-9", className)}
				type={visible ? "text" : "password"}
				{...props}
			/>
			<button
				className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
				type="button"
				onClick={() => setVisible((prev) => !prev)}
				aria-label={
					visible
						? t("ui.passwordInput.toggleVisibility.hide.aria-label")
						: t("ui.passwordInput.toggleVisibility.show.aria-label")
				}
				aria-pressed={visible}
				aria-controls="password"
			>
				{visible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
			</button>
		</div>
	);
});
