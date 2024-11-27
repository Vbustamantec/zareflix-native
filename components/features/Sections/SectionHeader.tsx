// components/ui/SectionHeader/SectionHeader.tsx
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, FONT_SIZES } from "@/constants/theme";

interface SectionHeaderProps {
	title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
	return (
		<View style={styles.sectionHeader}>
			<Text style={styles.sectionTitle}>{title}</Text>
			<Link href="/search" asChild>
				<Pressable style={styles.seeAllButton}>
					<Text style={styles.seeAllText}>See all</Text>
					<Ionicons
						name="chevron-forward"
						size={16}
						color={COLORS.primary.DEFAULT}
					/>
				</Pressable>
			</Link>
		</View>
	);
};

const styles = StyleSheet.create({
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: SPACING.lg,
		marginBottom: SPACING.md,
	},
	sectionTitle: {
		fontSize: FONT_SIZES.lg,
		fontWeight: "bold",
		color: COLORS.text.light,
	},
	seeAllButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: SPACING.xs,
	},
	seeAllText: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.primary.DEFAULT,
	},
});

export default SectionHeader;
