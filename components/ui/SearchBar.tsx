import React from "react";
import { View, StyleSheet, Pressable, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "@/components/ui/TextInput";
import { COLORS, SPACING } from "@/constants/theme";

const { width } = Dimensions.get("window");

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
			<TextInput
				value={value}
				onChangeText={onChangeText}
				placeholder="Search movies, series..."
				onSubmitEditing={onSubmit}
				returnKeyType="search"
				style={styles.input}
				containerStyle={styles.inputContainer}
				autoCapitalize="none"
				leftIcon={
					<Ionicons name="search" size={22} color={COLORS.text.light + "60"} />
				}
				rightIcon={
					value.length > 0 ? (
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
					) : null
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: SPACING.md,
		width: "100%",
	},
	inputContainer: {
		marginBottom: 0,
	},
	input: {
		width: width - SPACING.md * 2,
	},
	clearButton: {
		padding: SPACING.xs,
	},
	pressed: {
		opacity: 0.7,
	},
});
