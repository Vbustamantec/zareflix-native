import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { COLORS } from "@/constants/theme";

export default function AuthLayout() {
	const colorScheme = useColorScheme() ?? "light";

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: COLORS.background[colorScheme],
				},
			}}
		>
			<Stack.Screen
				name="sign-in"
				options={{
					title: "Sign In",
				}}
			/>
			<Stack.Screen
				name="sign-up"
				options={{
					title: "Sign Up",
				}}
			/>
		</Stack>
	);
}
