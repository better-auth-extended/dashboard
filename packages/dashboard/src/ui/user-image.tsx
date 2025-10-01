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
	const { components } = useDashboard();
	const { Avatar, AvatarFallback, AvatarImage } = components;

	return (
		<Avatar {...props}>
			<AvatarImage src={user.image ?? undefined} {...imageProps} alt={imageProps?.alt ?? user.name} />
			<AvatarFallback {...fallbackProps}>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
		</Avatar>
	);
};
UserImage.displayName = "UserImage";
