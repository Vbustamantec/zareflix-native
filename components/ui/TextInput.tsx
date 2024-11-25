import React from "react";
import {
	TextInput as RNTextInput,
	StyleSheet,
	TextInputProps as RNTextInputProps,
} from "react-native";
import { COLORS, SPACING, FONT_SIZES } from "@/constants/theme";

interface TextInputProps extends RNTextInputProps {
	value: string;
	onChangeText: (text: string) => void;
	multiLine?: boolean;
}

export const TextInput = ({
	value,
	onChangeText,
	multiLine,
	style,
	placeholderTextColor = COLORS.text.light + "60",
	...props
}: TextInputProps) => {
	return (
		<RNTextInput
			value={value}
			onChangeText={onChangeText}
			multiline={multiLine}
			style={[styles.input, multiLine && styles.multilineInput, style]}
			placeholderTextColor={placeholderTextColor}
			{...props}
		/>
	);
};

const styles = StyleSheet.create({
	input: {
		backgroundColor: COLORS.card.light,
		borderWidth: 1,
		borderColor: COLORS.border.light,
		borderRadius: SPACING.lg,
		padding: SPACING.md,
		fontSize: FONT_SIZES.md,
		color: COLORS.text.light,
		minHeight: 50,
	},
	multilineInput: {
		minHeight: 100,
		textAlignVertical: "top",
	},
});
