import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Heart } from "lucide-react-native";
import { COLORS, SPACING, FONT_SIZES } from "@/constants/theme";

export const EmptyFavorites = () => {
	const router = useRouter();

	const handlePress = () => {
		router.push("/(tabs)/search");
	};

	return (
		<View style={styles.container}>
			<View style={styles.iconContainer}>
				<Heart size={64} color={COLORS.primary.DEFAULT} strokeWidth={1.5} />
			</View>

			<View style={styles.textContainer}>
				<Text style={styles.title}>No Favorites Yet</Text>
				<Text style={styles.description}>
					Start exploring movies and mark your favorites to build your personal
					collection
				</Text>
			</View>

			<Pressable
				style={({ pressed }) => [
					styles.button,
					pressed && styles.buttonPressed,
				]}
				onPress={handlePress}
			>
				<Text style={styles.buttonText}>Discover Movies</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.background.light,
		padding: SPACING.xl,
	},
	iconContainer: {
		width: 120,
		height: 120,
		backgroundColor: COLORS.card.light,
		borderRadius: 60,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: SPACING.xl,
		borderWidth: 1,
		borderColor: COLORS.border.light,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
	},
	textContainer: {
		alignItems: "center",
		marginBottom: SPACING.xl * 1.5,
	},
	title: {
		fontSize: FONT_SIZES["2xl"],
		fontWeight: "700",
		color: COLORS.text.light,
		marginBottom: SPACING.md,
		textAlign: "center",
	},
	description: {
		fontSize: FONT_SIZES.md,
		color: COLORS.text.light + "80",
		textAlign: "center",
		maxWidth: 300,
		lineHeight: 24,
	},
	button: {
		backgroundColor: COLORS.primary.DEFAULT,
		paddingHorizontal: SPACING.xl,
		paddingVertical: SPACING.lg,
		borderRadius: SPACING.lg,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
	},
	buttonPressed: {
		opacity: 0.8,
		transform: [{ scale: 0.98 }],
	},
	buttonText: {
		color: "white",
		fontSize: FONT_SIZES.md,
		fontWeight: "600",
	},
});

export default EmptyFavorites;
