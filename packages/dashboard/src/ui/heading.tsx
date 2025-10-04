import type { TranslatableString } from "../source";
import { cn } from "../utils/cn";

export type HeadingProps = React.ComponentProps<"div"> & {
	heading: string | TranslatableString;
	headingProps?: Omit<React.ComponentProps<"h2">, "children">;
	description?: string | TranslatableString;
	descriptionProps?: Omit<React.ComponentProps<"h2">, "children">;
	containerProps?: Omit<React.ComponentProps<"div">, "children">;
};

export const Heading = ({
	heading,
	headingProps,
	description,
	descriptionProps,
	containerProps,
	className,
	children,
	...props
}: HeadingProps) => {
	return (
		<div
			className={cn(
				"mb-2 flex flex-wrap items-center justify-between space-y-2",
				className,
			)}
			{...props}
		>
			<div {...containerProps}>
				<h2
					{...headingProps}
					className={cn(
						"text-2xl font-bold tracking-tight",
						headingProps?.className,
					)}
				>
					{heading}
				</h2>
				{description && (
					<p
						{...descriptionProps}
						className={cn("text-muted-foreground", descriptionProps?.className)}
					>
						{description}
					</p>
				)}
			</div>
			{children}
		</div>
	);
};
