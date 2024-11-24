import React from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { COLORS } from "@/constants/theme";

interface SkeletonProps {
	width: number | string;
	height: number | string;
	style?: any;
}

export const Skeleton = ({ width, height, style }: SkeletonProps) => {
	const animatedValue = React.useRef(new Animated.Value(0)).current;

	React.useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(animatedValue, {
					toValue: 1,
					duration: 1000,
					easing: Easing.ease,
					useNativeDriver: true,
				}),
				Animated.timing(animatedValue, {
					toValue: 0,
					duration: 1000,
					easing: Easing.ease,
					useNativeDriver: true,
				}),
			])
		).start();
	}, []);

	const opacity = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [0.3, 0.7],
	});

	return (
		<Animated.View
			style={[styles.skeleton, { width, height, opacity }, style]}
		/>
	);
};

const styles = StyleSheet.create({
	skeleton: {
		backgroundColor: COLORS.card.dark,
		borderRadius: 8,
	},
});
