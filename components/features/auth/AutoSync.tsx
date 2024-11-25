import { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";

const API_URL = "https://zareflix-api-clerk.onrender.com";

export function AutoSync() {
	const { isLoaded, isSignedIn, user } = useUser();

	useEffect(() => {
		const syncUser = async () => {
			if (isLoaded && isSignedIn && user) {
				try {
					console.log("Attempting to sync user...");

					const userData = {
						email: user.emailAddresses[0].emailAddress,
						nickname:
							user.username ||
							user.emailAddresses[0].emailAddress.split("@")[0],
					};

					console.log("User data to sync:", userData);

					const healthCheck = await fetch(`${API_URL}/health`);
					console.log("Health check status:", healthCheck.status);

					const response = await fetch(`${API_URL}/api/user/sync`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
						},
						body: JSON.stringify(userData),
					});

					console.log("Sync response status:", response.status);

					if (!response.ok) {
						const errorText = await response.text();
						console.error("Error response:", errorText);
						throw new Error(`HTTP error! status: ${response.status}`);
					}

					const data = await response.json();
					console.log("User synced successfully:", data);
				} catch (error) {
					console.error("Detailed sync error:", error);
					if (error instanceof Error) {
						console.error("Error name:", error.name);
						console.error("Error message:", error.message);
						console.error("Error stack:", error.stack);
					}
				}
			}
		};

		syncUser();
	}, [isLoaded, isSignedIn, user]);

	return null;
}
