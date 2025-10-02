"use client";

import { useDashboard } from "../dashboard";
import type { Components } from "../types/components";

export type UserImageProps = React.ComponentProps<Components["Avatar"]> & {
	user: {
		name: string;
		image?: string | null;
	};
	imageProps?: Omit<React.ComponentProps<Components["AvatarImage"]>, "src">;
	fallbackProps?: Omit<
		React.ComponentProps<Components["AvatarFallback"]>,
		"children"
	>;
};

export const UserImage = ({
	user,
	imageProps,
	fallbackProps,
	...props
}: UserImageProps) => {
	const {
		components,
		icons: { User },
	} = useDashboard();
	const { Avatar, AvatarFallback, AvatarImage } = components;

	const fallback = user.name.charAt(0).toUpperCase();

	return (
		<Avatar {...props}>
			<AvatarImage
				src={user.image ?? undefined}
				{...imageProps}
				alt={imageProps?.alt ?? user.name}
			/>
			<AvatarFallback {...fallbackProps}>
				{fallback !== "" ? fallback : <User />}
			</AvatarFallback>
		</Avatar>
	);
};
UserImage.displayName = "UserImage";
