export default {
	expo: {
		name: "zareflixNative",
		slug: "zareflixNative",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./assets/images/favicon.png",
		scheme: "myapp",
		userInterfaceStyle: "automatic",
		newArchEnabled: true,
		extra: {
			CLERK_PUBLISHABLE_KEY: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
			OMDB_API_KEY_PUBLIC: process.env.EXPO_PUBLIC_OMDB_API_KEY,
		},
		ios: {
			supportsTablet: true,
		},
		android: {
			adaptiveIcon: {
				foregroundImage: "./assets/images/favicon.png",
				backgroundColor: "#ffffff",
			},
		},
		web: {
			bundler: "metro",
			output: "static",
			favicon: "./assets/images/favicon.png",
		},
		plugins: [
			"expo-router",
			[
				"expo-splash-screen",
				{
					image: "./assets/images/splash-icon.png",
					imageWidth: 200,
					resizeMode: "contain",
					backgroundColor: "#ffffff",
				},
			],
		],
		experiments: {
			typedRoutes: true,
		},
	},
};
