import React from "react";
import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";

interface ButtonProps {
	onPress: () => void;
	title: string;
	variant?: "primary" | "secondary";
	isLoading?: boolean;
	disabled?: boolean;
}

export const Button = ({
	onPress,
	title,
	variant = "primary",
	isLoading = false,
	disabled = false,
}: ButtonProps) => {
	return (
		<Pressable
			onPress={onPress}
			disabled={disabled || isLoading}
			style={({ pressed }) => [
				styles.button,
				styles[variant],
				pressed && styles.pressed,
				disabled && styles.disabled,
			]}
		>
			{isLoading ? (
				<ActivityIndicator color="white" />
			) : (
				<Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
			)}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	primary: {
		backgroundColor: "#dc2626",
	},
	secondary: {
		backgroundColor: "#18181C",
	},
	pressed: {
		opacity: 0.8,
		transform: [{ scale: 0.98 }],
	},
	disabled: {
		opacity: 0.5,
	},
	text: {
		fontSize: 16,
		fontWeight: "600",
	},
	primaryText: {
		color: "white",
	},
	secondaryText: {
		color: "white",
	},
});
