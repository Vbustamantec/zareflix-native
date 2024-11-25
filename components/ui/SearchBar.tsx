import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "@/components/ui/TextInput";
import { COLORS, SPACING } from "@/constants/theme";

interface SearchBarProps {
	value: string;
	onChangeText: (text: string) => void;
	onSubmit: () => void;
	isLoading?: boolean;
}

export const SearchBar = ({
	value,
	onChangeText,
	onSubmit,
	isLoading = false,
}: SearchBarProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<Ionicons
					name="search"
					size={22}
					color={COLORS.text.light + "60"}
					style={styles.searchIcon}
				/>
				<TextInput
					value={value}
					onChangeText={onChangeText}
					placeholder="Search movies, series..."
					onSubmitEditing={onSubmit}
					returnKeyType="search"
					style={styles.input}
					autoCapitalize="none"
				/>
				{value.length > 0 && (
					<Pressable
						onPress={() => onChangeText("")}
						style={({ pressed }) => [
							styles.clearButton,
							pressed && styles.pressed,
						]}
					>
						<Ionicons
							name="close-circle"
							size={22}
							color={COLORS.text.light + "60"}
						/>
					</Pressable>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: SPACING.md,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.card.light,
		borderRadius: SPACING.lg,
		borderWidth: 1,
		borderColor: COLORS.border.light,
	},
	searchIcon: {
		paddingLeft: SPACING.md,
	},
	input: {
		flex: 1,
		borderWidth: 0,
		backgroundColor: "transparent",
	},
	clearButton: {
		padding: SPACING.sm,
		marginRight: SPACING.xs,
	},
	pressed: {
		opacity: 0.7,
	},
});
