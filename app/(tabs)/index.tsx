import { StyleSheet, View, Text } from "react-native";

import Constants from "expo-constants";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";

export default function HomeScreen() {
	const { user } = useUser();
	return (
		<View style={styles.titleContainer}>
			<SignedIn>
				<Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
			</SignedIn>
			<SignedOut>
				<Link href="/sign-in">
					<Text>Sign In</Text>
				</Link>
				<Link href="/sign-up">
					<Text>Sign Up</Text>
				</Link>
			</SignedOut>
		</View>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		marginTop: Constants.statusBarHeight,
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},
});
