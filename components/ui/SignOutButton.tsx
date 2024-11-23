import React, { useState } from "react";
import { Pressable, Text, StyleSheet, View, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, FONT_SIZES } from "@/constants/theme";

interface SignOutButtonProps {
	onPress: () => void;
	username: string;
}

export const SignOutButton = ({ onPress, username }: SignOutButtonProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const expandAnim = React.useRef(new Animated.Value(0)).current;

	const handleLongPress = () => {
		setIsExpanded(true);
		Animated.spring(expandAnim, {
			toValue: 1,
			useNativeDriver: true,
		}).start();
	};

	const handlePressOut = () => {
		setIsExpanded(false);
		Animated.spring(expandAnim, {
			toValue: 0,
			useNativeDriver: true,
		}).start();
	};

	const expandStyle = {
		transform: [
			{
				scaleX: expandAnim.interpolate({
					inputRange: [0, 1],
					outputRange: [1, 1.5],
				}),
			},
		],
	};

	return (
		<View style={styles.container}>
			<Pressable
				onPress={onPress}
				onLongPress={handleLongPress}
				onPressOut={handlePressOut}
				style={({ pressed }) => [styles.button, pressed && styles.pressed]}
			>
				<Animated.View style={[styles.content, isExpanded && expandStyle]}>
					<View style={styles.textContainer}>
						<Text style={styles.signOutText}>Sign out</Text>
					</View>
					<Ionicons
						name="log-out-outline"
						size={20}
						color={COLORS.primary.DEFAULT}
					/>
				</Animated.View>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignSelf: "flex-end",
	},
	button: {
		backgroundColor: COLORS.card.light,
		borderRadius: SPACING.xl,
		padding: 2,
		borderWidth: 1,
		borderColor: COLORS.border.light,
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: SPACING.sm,
		gap: SPACING.xs,
	},
	avatarContainer: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: COLORS.primary.DEFAULT,
		justifyContent: "center",
		alignItems: "center",
	},
	avatarText: {
		color: "white",
		fontSize: FONT_SIZES.md,
		fontWeight: "bold",
	},
	textContainer: {
		paddingHorizontal: SPACING.xs,
	},
	username: {
		fontSize: FONT_SIZES.sm,
		fontWeight: "500",
		color: COLORS.text.light,
		maxWidth: 100,
	},
	signOutText: {
		fontSize: FONT_SIZES.xs,
		color: COLORS.primary.DEFAULT,
	},
	pressed: {
		opacity: 0.8,
		transform: [{ scale: 0.98 }],
	},
});
