export const config = {
	api: {
		omdb: {
			key: "cb3c0b9e",
			baseUrl: "http://www.omdbapi.com",
		},
		baseUrl: "https://zareflix-api.onrender.com/",
	},
	clerk: {
		publishableKey: "pk_test_dGlnaHQtc3VuYmlyZC02My5jbGVyay5hY2NvdW50cy5kZXYk",
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
