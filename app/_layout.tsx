import * as SecureStore from "expo-secure-store";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	const tokenCache = {
		async getToken(key: string) {
			try {
				const item = await SecureStore.getItemAsync(key);
				if (item) {
					console.log(`${key} was used 🔐 \n`);
				} else {
					console.log("No values stored under key: " + key);
				}
				return item;
			} catch (error) {
				console.error("SecureStore get item error: ", error);
				await SecureStore.deleteItemAsync(key);
				return null;
			}
		},
		async saveToken(key: string, value: string) {
			try {
				return SecureStore.setItemAsync(key, value);
			} catch (err) {
				return;
			}
		},
	};

	const publishableKey =
		"pk_test_dGlnaHQtc3VuYmlyZC02My5jbGVyay5hY2NvdW50cy5kZXYk";

	if (!publishableKey) {
		throw new Error(
			"Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
		);
	}

	return (
		<ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
			<ClerkLoaded>
				<ThemeProvider
					value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
				>
					<Stack>
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						<Stack.Screen name="+not-found" />
					</Stack>
					<StatusBar style="auto" />
				</ThemeProvider>
			</ClerkLoaded>
		</ClerkProvider>
	);
}
