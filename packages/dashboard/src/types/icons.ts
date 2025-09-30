import type { defaultIcons } from "../utils/icons";

export type IconComponent = React.ComponentType<React.ComponentProps<"svg">>;

export type Icons = Record<keyof typeof defaultIcons & string, IconComponent>;
