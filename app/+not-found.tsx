import { Link, Stack } from "expo-router";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, FONT_SIZES } from "@/constants/theme";
import { useColorScheme } from "react-native";
import React from "react";

export default function NotFoundScreen() {
	const colorScheme = useColorScheme() ?? "light";

	return (
		<>
			<Stack.Screen
				options={{
					title: "Oops!",
					headerShown: false,
				}}
			/>

			<View
				style={[
					styles.container,
					{ backgroundColor: COLORS.background[colorScheme] },
				]}
			>
				<View style={styles.iconContainer}>
					<Ionicons
						name="film-outline"
						size={100}
						color={COLORS.primary.DEFAULT}
						style={styles.icon}
					/>
					<View style={styles.errorCircle}>
						<Ionicons
							name="alert-circle"
							size={32}
							color={COLORS.primary.DEFAULT}
						/>
					</View>
				</View>

				<Text style={[styles.title, { color: COLORS.text[colorScheme] }]}>
					Scene Not Found
				</Text>

				<Text
					style={[
						styles.description,
						{ color: COLORS.text[colorScheme] + "80" },
					]}
				>
					Looks like this scene didn't make the final cut.
				</Text>

				<Link href="/" asChild>
					<Pressable
						style={({ pressed }) => [
							styles.button,
							pressed && styles.buttonPressed,
						]}
					>
						<Ionicons
							name="home-outline"
							size={24}
							color="white"
							style={styles.buttonIcon}
						/>
						<Text style={styles.buttonText}>Back to Home</Text>
					</Pressable>
				</Link>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: SPACING.xl,
	},
	iconContainer: {
		position: "relative",
		marginBottom: SPACING.xl,
	},
	icon: {
		opacity: 0.8,
	},
	errorCircle: {
		position: "absolute",
		bottom: -5,
		right: -5,
		backgroundColor: COLORS.background.light,
		borderRadius: 50,
		padding: SPACING.xs,
	},
	title: {
		fontSize: FONT_SIZES["3xl"],
		fontWeight: "bold",
		marginBottom: SPACING.sm,
		textAlign: "center",
	},
	description: {
		fontSize: FONT_SIZES.lg,
		textAlign: "center",
		marginBottom: SPACING.xl * 2,
	},
	button: {
		backgroundColor: COLORS.primary.DEFAULT,
		flexDirection: "row",
		alignItems: "center",
		padding: SPACING.lg,
		borderRadius: SPACING.md,
		minWidth: 200,
		justifyContent: "center",
	},
	buttonPressed: {
		backgroundColor: COLORS.primary.hover,
		transform: [{ scale: 0.98 }],
	},
	buttonIcon: {
		marginRight: SPACING.sm,
	},
	buttonText: {
		color: "white",
		fontSize: FONT_SIZES.md,
		fontWeight: "600",
	},
});
