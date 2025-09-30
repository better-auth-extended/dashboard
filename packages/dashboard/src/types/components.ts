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

type Separator = typeof SeparatorPrimitive.Root;

type Label = typeof LabelPrimitive.Root;

type Sheet = typeof SheetPrimitive.Trigger;
type SheetClose = typeof SheetPrimitive.Close;
type SheetContent = typeof SheetPrimitive.Content;
type SheetHeader = React.ComponentType<React.ComponentProps<"div">>;
type SheetFooter = React.ComponentType<React.ComponentProps<"div">>;
type SheetTitle = typeof SheetPrimitive.Title;
type SheetDescription = typeof SheetPrimitive.Description;

type TooltipProvider = typeof TooltipPrimitive.Provider;
type Tooltip = typeof TooltipPrimitive.Root;
type TooltipTrigger = typeof TooltipPrimitive.Trigger;
type TooltipContent = typeof TooltipPrimitive.Content;

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

type Avatar = typeof AvatarPrimitive.Root;
type AvatarImage = typeof AvatarPrimitive.Image;
type AvatarFallback = typeof AvatarPrimitive.Fallback;

type DropdownMenu = typeof DropdownMenuPrimitive.Root;
type DropdownMenuTrigger = React.ComponentType<
	React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>
>;
type DropdownMenuContent = typeof DropdownMenuPrimitive.Content;
type DropdownMenuGroup = typeof DropdownMenuPrimitive.Group;
type DropdownMenuItem = React.ComponentType<
	React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
		inset?: boolean;
		variant?: "default" | "destructive";
	}
>;
type DropdownMenuCheckboxItem = typeof DropdownMenuPrimitive.CheckboxItem;
type DropdownMenuRadioGroup = React.ComponentType<
	React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>
>;
type DropdownMenuRadioItem = typeof DropdownMenuPrimitive.RadioItem;
type DropdownMenuLabel = React.ComponentType<
	React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
		inset?: boolean;
	}
>;
type DropdownMenuSeparator = typeof DropdownMenuPrimitive.Separator;
type DropdownMenuShortcut = React.ComponentType<React.ComponentProps<"span">>;
type DropdownMenuSub = typeof DropdownMenuPrimitive.Sub;
type DropdownMenuSubTrigger = React.ComponentType<
	React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
		inset?: boolean;
	}
>;
type DropdownMenuSubContent = typeof DropdownMenuPrimitive.SubContent;

type Collapsible = typeof CollapsiblePrimitive.Root;
type CollapsibleTrigger = typeof CollapsiblePrimitive.CollapsibleTrigger;
type CollapsibleContent = typeof CollapsiblePrimitive.CollapsibleContent;

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

type Checkbox = typeof CheckboxPrimitive.Root;

type Table = React.ComponentType<React.ComponentProps<"table">>;
type TableHeader = React.ComponentType<React.ComponentProps<"thead">>;
type TableBody = React.ComponentType<React.ComponentProps<"tbody">>;
type TableFooter = React.ComponentType<React.ComponentProps<"tfoot">>;
type TableRow = React.ComponentType<React.ComponentProps<"tr">>;
type TableHead = React.ComponentType<React.ComponentProps<"th">>;
type TableCell = React.ComponentType<React.ComponentProps<"td">>;

type Dialog = typeof DialogPrimitive.Root;
type DialogTrigger = typeof DialogPrimitive.Trigger;
type DialogPortal = typeof DialogPrimitive.Portal;
type DialogClose = typeof DialogPrimitive.Close;
type DialogOverlay = typeof DialogPrimitive.Overlay;
type DialogContent = React.ComponentType<
	React.ComponentProps<typeof DialogPrimitive.Content> & {
		showCloseButton?: boolean;
	}
>;
type DialogHeader = React.ComponentType<React.ComponentProps<"div">>;
type DialogFooter = React.ComponentType<React.ComponentProps<"div">>;
type DialogTitle = typeof DialogPrimitive.Title;
type DialogDescription = typeof DialogPrimitive.Description;

type Command = typeof CommandPrimitive;
type CommandDialog = React.ComponentType<
	React.ComponentProps<Dialog> & {
		title?: string;
		description?: string;
		className?: string;
		showCloseButton?: boolean;
	}
>;
type CommandInput = typeof CommandPrimitive.Input;
type CommandList = typeof CommandPrimitive.List;
type CommandEmpty = typeof CommandPrimitive.Empty;
type CommandGroup = typeof CommandPrimitive.Group;
type CommandSeparator = typeof CommandPrimitive.Separator;
type CommandItem = typeof CommandPrimitive.Item;
type CommandShortcut = React.ComponentType<React.ComponentProps<"span">>;

type Popover = typeof PopoverPrimitive.Root;
type PopoverTrigger = typeof PopoverPrimitive.Trigger;
type PopoverContent = typeof PopoverPrimitive.Content;
type PopoverAnchor = typeof PopoverPrimitive.Anchor;

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
