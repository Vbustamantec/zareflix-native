import React from "react";
import { View, StyleSheet, Pressable, Animated, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "@/components/ui/TextInput";
import { COLORS, SPACING } from "@/constants/theme";
import { SearchBarProps } from "@/types/types";

export const SearchBar = ({
	value,
	onChangeText,
	onSubmit,
}: SearchBarProps) => {
	const [isFocused, setIsFocused] = React.useState(false);
	const scaleAnim = React.useRef(new Animated.Value(1)).current;
	const focusAnim = React.useRef(new Animated.Value(0)).current;

	const handleFocus = () => {
		setIsFocused(true);
		Animated.parallel([
			Animated.spring(scaleAnim, {
				toValue: 0.98,
				useNativeDriver: true,
			}),
			Animated.timing(focusAnim, {
				toValue: 1,
				duration: 200,
				useNativeDriver: true,
			}),
		]).start();
	};

	const handleBlur = () => {
		setIsFocused(false);
		Animated.parallel([
			Animated.spring(scaleAnim, {
				toValue: 1,
				useNativeDriver: true,
			}),
			Animated.timing(focusAnim, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true,
			}),
		]).start();
	};

	const borderColor = focusAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [COLORS.border.light, COLORS.primary.DEFAULT],
	});

	return (
		<Animated.View
			style={[
				styles.container,
				{
					transform: [{ scale: scaleAnim }],
					borderColor: borderColor,
				},
			]}
		>
			<Animated.View style={styles.iconContainer}>
				<Ionicons
					name="search"
					size={22}
					color={isFocused ? COLORS.primary.DEFAULT : COLORS.text.light + "60"}
				/>
			</Animated.View>

			<TextInput
				value={value}
				onChangeText={onChangeText}
				onFocus={handleFocus}
				onBlur={handleBlur}
				placeholder="Search movies..."
				onSubmitEditing={() => {
					onSubmit();
					Keyboard.dismiss();
				}}
				returnKeyType="search"
				style={styles.input}
			/>

			{value.length > 0 && (
				<Pressable
					onPress={() => {
						onChangeText("");
						Keyboard.dismiss();
					}}
					style={({ pressed }) => [
						styles.clearButton,
						pressed && styles.pressed,
					]}
				>
					<Animated.View
						style={{
							transform: [
								{
									scale: focusAnim.interpolate({
										inputRange: [0, 1],
										outputRange: [0.8, 1],
									}),
								},
							],
						}}
					>
						<Ionicons
							name="close-circle"
							size={22}
							color={COLORS.text.light + "60"}
						/>
					</Animated.View>
				</Pressable>
			)}
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.card.light,
		borderRadius: SPACING.lg,
		borderWidth: 2,
		margin: SPACING.md,
	},
	iconContainer: {
		padding: SPACING.md,
	},
	input: {
		flex: 1,
		borderWidth: 0,
		backgroundColor: "transparent",
	},
	clearButton: {
		padding: SPACING.md,
	},
	pressed: {
		opacity: 0.7,
		transform: [{ scale: 0.95 }],
	},
});
