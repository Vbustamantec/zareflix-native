import { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { useColorScheme, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { COLORS } from "@/constants/theme";
import { AutoSync } from "@/components/features/auth/AutoSync";
import { config } from "@/config";

const tokenCache = {
	async getToken(key: string) {
		try {
			return SecureStore.getItemAsync(key);
		} catch (err) {
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

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			retry: 2,
		},
	},
});

function InitialLayout() {
	const { isLoaded, isSignedIn } = useAuth();
	const segments = useSegments();
	const router = useRouter();
	const colorScheme = useColorScheme() ?? "light";

	useEffect(() => {
		if (!isLoaded) return;

		const inAuthGroup = segments[0] === "(auth)";

		if (isSignedIn && inAuthGroup) {
			router.replace("/(tabs)");
		} else if (!isSignedIn && !inAuthGroup) {
			router.replace("/sign-in");
		}
	}, [isSignedIn, segments]);

	return (
		<SafeAreaProvider>
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: COLORS.background[colorScheme],
				}}
			>
				<StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
				<View style={{ flex: 1 }}>
					<Slot />
				</View>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

export default function RootLayout() {
	if (!config.clerk.publishableKey) {
		throw new Error("Missing Clerk Publishable Key");
	}

	return (
		<QueryClientProvider client={queryClient}>
			<ClerkProvider
				publishableKey={config.clerk.publishableKey}
				tokenCache={tokenCache}
			>
				<ClerkLoaded>
					<AutoSync />
					<InitialLayout />
				</ClerkLoaded>
			</ClerkProvider>
		</QueryClientProvider>
	);
}
