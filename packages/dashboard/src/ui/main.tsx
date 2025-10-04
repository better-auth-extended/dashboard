import { cn } from "../utils/cn";

export type MainProps = React.ComponentProps<"div"> & {
	fluid?: boolean;
};

export const Main = ({ fluid, className, ...props }: MainProps) => {
	return (
		<div
			className={cn(
				"px-4 py-6",
				!fluid &&
					"@7xl/content:mx-auto @7xl/content:w-full @7xl/content:max-w-7xl",
			)}
			{...props}
		/>
	);
};
