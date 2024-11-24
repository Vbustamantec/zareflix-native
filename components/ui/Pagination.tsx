import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, FONT_SIZES } from "@/constants/theme";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	isLoading?: boolean;
}

export const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
	isLoading,
}: PaginationProps) => {
	if (totalPages <= 1) return null;

	return (
		<View style={styles.container}>
			<Pressable
				onPress={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1 || isLoading}
				style={({ pressed }) => [
					styles.pageButton,
					(currentPage === 1 || isLoading) && styles.disabled,
					pressed && styles.pressed,
				]}
			>
				<Ionicons name="chevron-back" size={24} color="white" />
			</Pressable>

			<View style={styles.pageInfo}>
				<Text style={styles.pageText}>
					Page {currentPage} of {totalPages}
				</Text>
			</View>

			<Pressable
				onPress={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages || isLoading}
				style={({ pressed }) => [
					styles.pageButton,
					(currentPage === totalPages || isLoading) && styles.disabled,
					pressed && styles.pressed,
				]}
			>
				<Ionicons name="chevron-forward" size={24} color="white" />
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: SPACING.lg,
		gap: SPACING.md,
	},
	pageButton: {
		backgroundColor: COLORS.primary.DEFAULT,
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	pageInfo: {
		backgroundColor: COLORS.card.light,
		paddingHorizontal: SPACING.lg,
		paddingVertical: SPACING.sm,
		borderRadius: SPACING.md,
	},
	pageText: {
		color: COLORS.text.light,
		fontSize: FONT_SIZES.sm,
		fontWeight: "500",
	},
	disabled: {
		opacity: 0.5,
	},
	pressed: {
		opacity: 0.8,
		transform: [{ scale: 0.96 }],
	},
});
