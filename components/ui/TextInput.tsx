import React, { ReactNode } from "react";
import {
	TextInput as RNTextInput,
	StyleSheet,
	View,
	Text,
	ViewStyle,
} from "react-native";
import { COLORS, SPACING, FONT_SIZES } from "@/constants/theme";

interface TextInputProps {
	value: string;
	onChangeText: (text: string) => void;
	placeholder?: string;
	secureTextEntry?: boolean;
	label?: string;
	error?: string;
	autoCapitalize?: "none" | "sentences" | "words" | "characters";
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	onSubmitEditing?: () => void;
	returnKeyType?: "done" | "go" | "next" | "search" | "send";
	style?: ViewStyle;
	containerStyle?: ViewStyle;
}

export const TextInput = ({
	value,
	onChangeText,
	placeholder,
	secureTextEntry = false,
	label,
	error,
	autoCapitalize = "none",
	leftIcon,
	rightIcon,
	onSubmitEditing,
	returnKeyType,
	style,
	containerStyle,
}: TextInputProps) => {
	return (
		<View style={[styles.container, containerStyle]}>
			{label && <Text style={styles.label}>{label}</Text>}
			<View style={[styles.inputContainer, error && styles.inputError, style]}>
				{leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
				<RNTextInput
					value={value}
					onChangeText={onChangeText}
					placeholder={placeholder}
					secureTextEntry={secureTextEntry}
					style={[
						styles.input,
						leftIcon ? styles.inputWithLeftIcon : null,
						rightIcon ? styles.inputWithRightIcon : null,
					].filter(Boolean)}
					placeholderTextColor={COLORS.text.light + "60"}
					autoCapitalize={autoCapitalize}
					onSubmitEditing={onSubmitEditing}
					returnKeyType={returnKeyType}
				/>
				{rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
			</View>
			{error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: SPACING.md,
	},
	label: {
		fontSize: FONT_SIZES.sm,
		marginBottom: SPACING.xs,
		color: COLORS.text.light,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.card.light,
		borderRadius: SPACING.lg,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: COLORS.border.light,
	},
	input: {
		flex: 1,
		paddingVertical: SPACING.md,
		paddingHorizontal: SPACING.lg,
		fontSize: FONT_SIZES.md,
		color: COLORS.text.light,
		minHeight: 50,
	},
	inputWithLeftIcon: {
		paddingLeft: SPACING.xs,
	},
	inputWithRightIcon: {
		paddingRight: SPACING.xs,
	},
	inputError: {
		borderWidth: 1,
		borderColor: COLORS.primary.DEFAULT,
	},
	error: {
		color: COLORS.primary.DEFAULT,
		fontSize: FONT_SIZES.sm,
		marginTop: SPACING.xs,
	},
	iconLeft: {
		paddingLeft: SPACING.lg,
	},
	iconRight: {
		paddingRight: SPACING.lg,
	},
});
