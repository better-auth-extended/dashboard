import type { IconComponent } from "../types/icons";

export const defaultIcons = {
	ChevronsUpDown: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="m7 15 5 5 5-5M7 9l5-5 5 5" />
		</svg>
	),
	ChevronDown: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="m6 9 6 6 6-6" />
		</svg>
	),
	ChevronUp: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="m18 15-6-6-6 6" />
		</svg>
	),
	ChevronRight: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="m9 18 6-6-6-6" />
		</svg>
	),
	Check: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="M20 6 9 17l-5-5" />
		</svg>
	),
	Globe: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<circle cx={12} cy={12} r={10} />
			<path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
		</svg>
	),
	LogOut: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="m16 17 5-5-5-5M21 12H9M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
		</svg>
	),
	Ellipsis: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<circle cx={12} cy={12} r={1} />
			<circle cx={19} cy={12} r={1} />
			<circle cx={5} cy={12} r={1} />
		</svg>
	),
	Tag: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
			<circle cx={7.5} cy={7.5} r={0.5} fill="currentColor" />
		</svg>
	),
	X: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="M18 6 6 18M6 6l12 12" />
		</svg>
	),
	CirclePlus: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<circle cx={12} cy={12} r={10} />
			<path d="M8 12h8M12 8v8" />
		</svg>
	),
	ShieldUser: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
			<path d="M6.376 18.91a6 6 0 0 1 11.249.003" />
			<circle cx={12} cy={11} r={4} />
		</svg>
	),
	User: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
			<circle cx={12} cy={7} r={4} />
		</svg>
	),
	ListFilter: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="M2 5h20M6 12h12M9 19h6" />
		</svg>
	),
	ShieldBan: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1zM4.243 5.21l14.39 12.472" />
		</svg>
	),
	ShieldOff: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="m2 2 20 20M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264" />
		</svg>
	),
	Trash: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
		</svg>
	),
	HatGlasses: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="M14 18a2 2 0 0 0-4 0M19 11l-2.11-6.657a2 2 0 0 0-2.752-1.148l-1.276.61A2 2 0 0 1 12 4H8.5a2 2 0 0 0-1.925 1.456L5 11M2 11h20" />
			<circle cx={17} cy={18} r={3} />
			<circle cx={7} cy={18} r={3} />
		</svg>
	),
	Pencil: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4" />
		</svg>
	),
	Settings2: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="M14 17H5M19 7h-9" />
			<circle cx={17} cy={17} r={3} />
			<circle cx={7} cy={7} r={3} />
		</svg>
	),
	LoaderCircle: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="M21 12a9 9 0 1 1-6.219-8.56" />
		</svg>
	),
	ArrowLeft: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="m12 19-7-7 7-7M19 12H5" />
		</svg>
	),
	ZoomOut: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<circle cx={11} cy={11} r={8} />
			<path d="m21 21-4.35-4.35M8 11h6" />
		</svg>
	),
	ZoomIn: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<circle cx={11} cy={11} r={8} />
			<path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
		</svg>
	),
	Upload: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="M12 3v12M17 8l-5-5-5 5M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
		</svg>
	),
	Plus: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="M5 12h14M12 5v14" />
		</svg>
	),
	Minus: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="M5 12h14" />
		</svg>
	),
	ShieldX: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1zM14.5 9.5l-5 5M9.5 9.5l5 5" />
		</svg>
	),
	ChevronLeft: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="m15 18-6-6 6-6" />
		</svg>
	),
	ChevronsLeft: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="m11 17-5-5 5-5M18 17l-5-5 5-5" />
		</svg>
	),
	ChevronsRight: (props) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			{...props}
		>
			<path d="m6 17 5-5-5-5M13 17l5-5-5-5" />
		</svg>
	),
} satisfies Record<string, IconComponent>;
