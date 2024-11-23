import { DefaultTheme } from "@react-navigation/native";

export const COLORS = {
	primary: {
		DEFAULT: "#dc2626",
		hover: "#b91c1c",
		dark: "#991b1b",
	},
	background: {
		light: "#ffffff",
		dark: "#0a0a0a",
	},
	text: {
		light: "#18181C",
		dark: "#ffffff",
	},
	card: {
		light: "#f3f4f6",
		dark: "#18181C",
	},
	border: {
		light: "#e5e7eb",
		dark: "#27272a",
	},
};

export const SIZES = {
	padding: 16,
	radius: 8,
	gap: 12,
};

export const FONTS = {
	title: {
		fontSize: 24,
		fontWeight: "700",
	},
	body: {
		fontSize: 16,
		fontWeight: "400",
	},
	button: {
		fontSize: 16,
		fontWeight: "600",
	},
};

export const SPACING = {
	xs: 4,
	sm: 8,
	md: 16,
	lg: 24,
	xl: 32,
};

export const FONT_SIZES = {
	xs: 12,
	sm: 14,
	md: 16,
	lg: 18,
	xl: 20,
	"2xl": 24,
	"3xl": 30,
	"4xl": 36,
};

export const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: COLORS.primary.DEFAULT,
		background: COLORS.background.light,
		text: COLORS.text.light,
		card: COLORS.card.light,
		border: COLORS.border.light,
	},
	dark: {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			primary: COLORS.primary.DEFAULT,
			background: COLORS.background.dark,
			text: COLORS.text.dark,
			card: COLORS.card.dark,
			border: COLORS.border.dark,
		},
	},
};
