import { Toaster as Sonner } from "sonner";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import type React from "react";

type Input = React.ComponentType<React.ComponentProps<"input">>;

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	asChild?: boolean;
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link";
	size?: "default" | "sm" | "lg" | "icon";
}

type Button = React.ComponentType<ButtonProps>;

type Separator = React.ComponentType<
	React.ComponentProps<typeof SeparatorPrimitive.Root>
>;

type Label = React.ComponentType<
	React.ComponentProps<typeof LabelPrimitive.Root>
>;

type Sheet = React.ComponentType<
	React.ComponentProps<typeof SheetPrimitive.Trigger>
>;
type SheetClose = React.ComponentType<
	React.ComponentProps<typeof SheetPrimitive.Close>
>;
type SheetContent = React.ComponentType<
	React.ComponentProps<typeof SheetPrimitive.Content>
>;
type SheetHeader = React.ComponentType<React.ComponentProps<"div">>;
type SheetFooter = React.ComponentType<React.ComponentProps<"div">>;
type SheetTitle = React.ComponentType<
	React.ComponentProps<typeof SheetPrimitive.Title>
>;
type SheetDescription = React.ComponentType<
	React.ComponentProps<typeof SheetPrimitive.Description>
>;

type TooltipProvider = React.ComponentType<
	React.ComponentProps<typeof TooltipPrimitive.Provider>
>;
type Tooltip = React.ComponentType<
	React.ComponentProps<typeof TooltipPrimitive.Root>
>;
type TooltipTrigger = React.ComponentType<
	React.ComponentProps<typeof TooltipPrimitive.Trigger>
>;
type TooltipContent = React.ComponentType<
	React.ComponentProps<typeof TooltipPrimitive.Content>
>;

type Skeleton = React.ComponentType<React.ComponentProps<"div">>;

type SidebarContextProps = {
	state: "expanded" | "collapsed";
	open: boolean;
	setOpen: (open: boolean) => void;
	openMobile: boolean;
	setOpenMobile: (open: boolean) => void;
	isMobile: boolean;
	toggleSidebar: () => void;
};
type UseSidebar = () => SidebarContextProps;
type SidebarProvider = React.ComponentType<
	React.ComponentProps<"div"> & {
		defaultOpen?: boolean;
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
	}
>;
type Sidebar = React.ComponentType<
	React.ComponentProps<"div"> & {
		side?: "left" | "right";
		variant?: "sidebar" | "floating" | "inset";
		collapsible?: "offcanvas" | "icon" | "none";
	}
>;
type SidebarInset = React.ComponentType<React.ComponentProps<"main">>;
type SidebarContent = React.ComponentType<React.ComponentProps<"div">>;
type SidebarGroup = React.ComponentType<React.ComponentProps<"div">>;
type SidebarGroupLabel = React.ComponentType<
	React.ComponentProps<"div"> & { asChild?: boolean }
>;
type SidebarGroupContent = React.ComponentType<React.ComponentProps<"div">>;
type SidebarMenu = React.ComponentType<React.ComponentProps<"ul">>;
type SidebarMenuItem = React.ComponentType<React.ComponentProps<"li">>;
type SidebarMenuButton = React.ComponentType<
	React.ComponentProps<"button"> & {
		asChild?: boolean;
		isActive?: boolean;
		tooltip?: string | React.ComponentProps<TooltipContent>;
		size?: "default" | "sm" | "lg";
		variant?: "default" | "outline";
	}
>;
type SidebarTrigger = Button;
type SidebarHeader = React.ComponentType<React.ComponentProps<"div">>;
type SidebarFooter = React.ComponentType<React.ComponentProps<"div">>;
type SidebarMenuAction = React.ComponentType<
	React.ComponentProps<"button"> & {
		asChild?: boolean;
		showOnHover?: boolean;
	}
>;
type SidebarMenuSub = React.ComponentType<React.ComponentProps<"ul">>;
type SidebarMenuSubItem = React.ComponentType<React.ComponentProps<"li">>;
type SidebarMenuSubButton = React.ComponentType<
	React.ComponentProps<"a"> & {
		asChild?: boolean;
		size?: "sm" | "md";
		isActive?: boolean;
	}
>;

type Avatar = React.ComponentType<
	React.ComponentProps<typeof AvatarPrimitive.Root>
>;
type AvatarImage = React.ComponentType<
	React.ComponentProps<typeof AvatarPrimitive.Image>
>;
type AvatarFallback = React.ComponentType<
	React.ComponentProps<typeof AvatarPrimitive.Fallback>
>;

type DropdownMenu = React.ComponentType<
	React.ComponentProps<typeof DropdownMenuPrimitive.Root>
>;
type DropdownMenuTrigger = React.ComponentType<
	React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>
>;
type DropdownMenuContent = React.ComponentType<
	React.ComponentProps<typeof DropdownMenuPrimitive.Content>
>;
type DropdownMenuGroup = React.ComponentType<
	React.ComponentProps<typeof DropdownMenuPrimitive.Group>
>;
type DropdownMenuItem = React.ComponentType<
	React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
		inset?: boolean;
		variant?: "default" | "destructive";
	}
>;
type DropdownMenuCheckboxItem = React.ComponentType<
	React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>
>;
type DropdownMenuRadioGroup = React.ComponentType<
	React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>
>;
type DropdownMenuRadioItem = React.ComponentType<
	React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>
>;
type DropdownMenuLabel = React.ComponentType<
	React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
		inset?: boolean;
	}
>;
type DropdownMenuSeparator = React.ComponentType<
	React.ComponentProps<typeof DropdownMenuPrimitive.Separator>
>;
type DropdownMenuShortcut = React.ComponentType<React.ComponentProps<"span">>;
type DropdownMenuSub = React.ComponentType<
	React.ComponentProps<typeof DropdownMenuPrimitive.Sub>
>;
type DropdownMenuSubTrigger = React.ComponentType<
	React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
		inset?: boolean;
	}
>;
type DropdownMenuSubContent = React.ComponentType<
	React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>
>;

type Collapsible = React.ComponentType<
	React.ComponentProps<typeof CollapsiblePrimitive.Root>
>;
type CollapsibleTrigger = React.ComponentType<
	React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>
>;
type CollapsibleContent = React.ComponentType<
	React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>
>;

type Breadcrumb = React.ComponentType<React.ComponentProps<"nav">>;
type BreadcrumbList = React.ComponentType<React.ComponentProps<"ol">>;
type BreadcrumbItem = React.ComponentType<React.ComponentProps<"li">>;
type BreadcrumbLink = React.ComponentType<
	React.ComponentProps<"a"> & {
		asChild?: boolean;
	}
>;
type BreadcrumbPage = React.ComponentType<React.ComponentProps<"span">>;
type BreadcrumbSeparator = React.ComponentType<React.ComponentProps<"li">>;

type Badge = React.ComponentType<
	React.ComponentProps<"span"> & {
		variant?: "default" | "secondary" | "destructive" | "outline";
		asChild?: boolean;
	}
>;

type Checkbox = React.ComponentType<
	React.ComponentProps<typeof CheckboxPrimitive.Root>
>;

type Table = React.ComponentType<React.ComponentProps<"table">>;
type TableHeader = React.ComponentType<React.ComponentProps<"thead">>;
type TableBody = React.ComponentType<React.ComponentProps<"tbody">>;
type TableFooter = React.ComponentType<React.ComponentProps<"tfoot">>;
type TableRow = React.ComponentType<React.ComponentProps<"tr">>;
type TableHead = React.ComponentType<React.ComponentProps<"th">>;
type TableCell = React.ComponentType<React.ComponentProps<"td">>;

type Dialog = React.ComponentType<
	React.ComponentProps<typeof DialogPrimitive.Root>
>;
type DialogTrigger = React.ComponentType<
	React.ComponentProps<typeof DialogPrimitive.Trigger>
>;
type DialogPortal = React.ComponentType<
	React.ComponentProps<typeof DialogPrimitive.Portal>
>;
type DialogClose = React.ComponentType<
	React.ComponentProps<typeof DialogPrimitive.Close>
>;
type DialogOverlay = React.ComponentType<
	React.ComponentProps<typeof DialogPrimitive.Overlay>
>;
type DialogContent = React.ComponentType<
	React.ComponentProps<typeof DialogPrimitive.Content> & {
		showCloseButton?: boolean;
	}
>;
type DialogHeader = React.ComponentType<React.ComponentProps<"div">>;
type DialogFooter = React.ComponentType<React.ComponentProps<"div">>;
type DialogTitle = React.ComponentType<
	React.ComponentProps<typeof DialogPrimitive.Title>
>;
type DialogDescription = React.ComponentType<
	React.ComponentProps<typeof DialogPrimitive.Description>
>;

type Command = React.ComponentType<
	React.ComponentProps<typeof CommandPrimitive>
>;
type CommandDialog = React.ComponentType<
	React.ComponentProps<Dialog> & {
		title?: string;
		description?: string;
		className?: string;
		showCloseButton?: boolean;
	}
>;
type CommandInput = React.ComponentType<
	React.ComponentProps<typeof CommandPrimitive.Input>
>;
type CommandList = React.ComponentType<
	React.ComponentProps<typeof CommandPrimitive.List>
>;
type CommandEmpty = React.ComponentType<
	React.ComponentProps<typeof CommandPrimitive.Empty>
>;
type CommandGroup = React.ComponentType<
	React.ComponentProps<typeof CommandPrimitive.Group>
>;
type CommandSeparator = React.ComponentType<
	React.ComponentProps<typeof CommandPrimitive.Separator>
>;
type CommandItem = React.ComponentType<
	React.ComponentProps<typeof CommandPrimitive.Item>
>;
type CommandShortcut = React.ComponentType<React.ComponentProps<"span">>;

type Popover = React.ComponentType<
	React.ComponentProps<typeof PopoverPrimitive.Root>
>;
type PopoverTrigger = React.ComponentType<
	React.ComponentProps<typeof PopoverPrimitive.Trigger>
>;
type PopoverContent = React.ComponentType<
	React.ComponentProps<typeof PopoverPrimitive.Content>
>;
type PopoverAnchor = React.ComponentType<
	React.ComponentProps<typeof PopoverPrimitive.Anchor>
>;

export type Components = {
	Button: Button;
	Label: Label;
	Input: Input;
	Separator: Separator;
	Sheet: Sheet;
	SheetClose: SheetClose;
	SheetContent: SheetContent;
	SheetHeader: SheetHeader;
	SheetFooter: SheetFooter;
	SheetTitle: SheetTitle;
	SheetDescription: SheetDescription;
	TooltipProvider: TooltipProvider;
	Tooltip: Tooltip;
	TooltipTrigger: TooltipTrigger;
	TooltipContent: TooltipContent;
	Skeleton: Skeleton;
	useSidebar: UseSidebar;
	SidebarProvider: SidebarProvider;
	Sidebar: Sidebar;
	SidebarInset: SidebarInset;
	SidebarContent: SidebarContent;
	SidebarGroup: SidebarGroup;
	SidebarGroupLabel: SidebarGroupLabel;
	SidebarGroupContent: SidebarGroupContent;
	SidebarMenu: SidebarMenu;
	SidebarMenuItem: SidebarMenuItem;
	SidebarMenuButton: SidebarMenuButton;
	SidebarTrigger: SidebarTrigger;
	SidebarHeader: SidebarHeader;
	SidebarFooter: SidebarFooter;
	SidebarMenuAction: SidebarMenuAction;
	Avatar: Avatar;
	AvatarImage: AvatarImage;
	AvatarFallback: AvatarFallback;
	DropdownMenu: DropdownMenu;
	DropdownMenuTrigger: DropdownMenuTrigger;
	DropdownMenuContent: DropdownMenuContent;
	DropdownMenuGroup: DropdownMenuGroup;
	DropdownMenuItem: DropdownMenuItem;
	DropdownMenuCheckboxItem: DropdownMenuCheckboxItem;
	DropdownMenuRadioGroup: DropdownMenuRadioGroup;
	DropdownMenuRadioItem: DropdownMenuRadioItem;
	DropdownMenuLabel: DropdownMenuLabel;
	DropdownMenuSeparator: DropdownMenuSeparator;
	DropdownMenuShortcut: DropdownMenuShortcut;
	DropdownMenuSub: DropdownMenuSub;
	DropdownMenuSubTrigger: DropdownMenuSubTrigger;
	DropdownMenuSubContent: DropdownMenuSubContent;
	Collapsible: Collapsible;
	CollapsibleTrigger: CollapsibleTrigger;
	CollapsibleContent: CollapsibleContent;
	SidebarMenuSub: SidebarMenuSub;
	SidebarMenuSubItem: SidebarMenuSubItem;
	SidebarMenuSubButton: SidebarMenuSubButton;
	Breadcrumb: Breadcrumb;
	BreadcrumbList: BreadcrumbList;
	BreadcrumbItem: BreadcrumbItem;
	BreadcrumbLink: BreadcrumbLink;
	BreadcrumbPage: BreadcrumbPage;
	BreadcrumbSeparator: BreadcrumbSeparator;
	Badge: Badge;
	Checkbox: Checkbox;
	Table: Table;
	TableHeader: TableHeader;
	TableBody: TableBody;
	TableFooter: TableFooter;
	TableRow: TableRow;
	TableHead: TableHead;
	TableCell: TableCell;
	Dialog: Dialog;
	DialogTrigger: DialogTrigger;
	DialogPortal: DialogPortal;
	DialogClose: DialogClose;
	DialogOverlay: DialogOverlay;
	DialogContent: DialogContent;
	DialogHeader: DialogHeader;
	DialogFooter: DialogFooter;
	DialogTitle: DialogTitle;
	DialogDescription: DialogDescription;
	Command: Command;
	CommandDialog: CommandDialog;
	CommandInput: CommandInput;
	CommandList: CommandList;
	CommandEmpty: CommandEmpty;
	CommandGroup: CommandGroup;
	CommandSeparator: CommandSeparator;
	CommandItem: CommandItem;
	CommandShortcut: CommandShortcut;
	Popover: Popover;
	PopoverTrigger: PopoverTrigger;
	PopoverContent: PopoverContent;
	PopoverAnchor: PopoverAnchor;
};
