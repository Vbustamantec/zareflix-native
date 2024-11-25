import {
	EXPO_PUBLIC_OMDB_API_KEY,
	EXPO_PUBLIC_API_URL,
	EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
} from "@env";

export const config = {
	api: {
		omdb: {
			key: EXPO_PUBLIC_OMDB_API_KEY,
			baseUrl: "http://www.omdbapi.com",
		},
		baseUrl: EXPO_PUBLIC_API_URL,
	},
	clerk: {
		publishableKey: EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
	},
} as const;

const requiredEnvVars = [
	"EXPO_PUBLIC_OMDB_API_KEY",
	"EXPO_PUBLIC_API_URL",
	"EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY",
];

requiredEnvVars.forEach((envVar) => {
	if (!process.env[envVar]) {
		throw new Error(`Missing required environment variable: ${envVar}`);
	}
});
