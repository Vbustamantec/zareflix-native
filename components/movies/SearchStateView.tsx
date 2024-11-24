import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, FONT_SIZES } from "@/constants/theme";

interface SearchStateViewProps {
	type: "empty" | "noResults" | "error";
	searchQuery?: string;
	onRetry?: () => void;
}

export const SearchStateView = ({
	type,
	onRetry,
	searchQuery,
}: SearchStateViewProps) => {
	const getContent = () => {
		switch (type) {
			case "empty":
				return {
					icon: "search-outline",
					title: "Search Movies",
					message: "Start typing to search for movies",
				};
			case "noResults":
				return {
					icon: "alert-circle-outline",
					title: "No Results Found",
					message: `We couldn't find any movies matching "${searchQuery}"`,
				};
			case "error":
				return {
					icon: "warning-outline",
					title: "Something Went Wrong",
					message: "There was an error searching for movies. Please try again.",
				};
			default:
				return null;
		}
	};

	const content = getContent();
	if (!content) return null;

	return (
		<View style={styles.container}>
			<Ionicons
				name={content.icon as any}
				size={64}
				color={COLORS.text.light + "40"}
			/>
			<Text style={styles.title}>{content.title}</Text>
			<Text style={styles.message}>{content.message}</Text>
			{type === "error" && onRetry && (
				<Pressable
					onPress={onRetry}
					style={({ pressed }) => [
						styles.retryButton,
						pressed && styles.pressed,
					]}
				>
					<Ionicons name="refresh" size={20} color="white" />
					<Text style={styles.retryText}>Try Again</Text>
				</Pressable>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: SPACING.xl,
		marginTop: SPACING.xl * 2,
	},
	title: {
		fontSize: FONT_SIZES.xl,
		fontWeight: "bold",
		color: COLORS.text.light,
		marginTop: SPACING.lg,
		marginBottom: SPACING.sm,
	},
	message: {
		fontSize: FONT_SIZES.md,
		color: COLORS.text.light + "80",
		textAlign: "center",
	},
	retryButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.primary.DEFAULT,
		paddingHorizontal: SPACING.lg,
		paddingVertical: SPACING.md,
		borderRadius: SPACING.md,
		marginTop: SPACING.xl,
		gap: SPACING.sm,
	},
	retryText: {
		color: "white",
		fontSize: FONT_SIZES.md,
		fontWeight: "600",
	},
	pressed: {
		opacity: 0.8,
		transform: [{ scale: 0.98 }],
	},
});
