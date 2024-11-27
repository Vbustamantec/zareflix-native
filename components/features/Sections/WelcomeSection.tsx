import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SPACING, FONT_SIZES, COLORS } from "@/constants/theme";

interface WelcomeSectionProps {
	username: string;
	onSignOut: () => void;
}

export const WelcomeSection = ({
	username,
	onSignOut,
}: WelcomeSectionProps) => (
	<View style={styles.welcomeSection}>
		<View>
			<Text style={styles.greeting}>Welcome back,</Text>
			<Text style={styles.username}>{username}</Text>
		</View>
		<Pressable onPress={onSignOut} style={styles.signOutButton}>
			<Text style={styles.signOutText}>Sign out</Text>
			<Ionicons
				name="chevron-forward"
				size={16}
				color={COLORS.primary.DEFAULT}
			/>
		</Pressable>
	</View>
);

const styles = StyleSheet.create({
	welcomeSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: SPACING.lg,
		marginBottom: SPACING.xl,
	},
	greeting: {
		fontSize: FONT_SIZES.md,
		color: COLORS.text.light + "80",
	},
	username: {
		fontSize: FONT_SIZES.xl,
		fontWeight: "bold",
		color: COLORS.text.light,
	},
	signOutButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: SPACING.xs,
	},
	signOutText: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.primary.DEFAULT,
	},
});
