import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, View, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { COLORS, SPACING, FONT_SIZES } from "@/constants/theme";

export default function SignInScreen() {
	const { signIn, setActive, isLoaded } = useSignIn();
	const router = useRouter();

	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const onSignInPress = async () => {
		if (!isLoaded) return;

		setIsLoading(true);
		setError("");

		try {
			const signInAttempt = await signIn.create({
				identifier: emailAddress,
				password,
			});

			if (signInAttempt.status === "complete") {
				await setActive({ session: signInAttempt.createdSessionId });
				router.replace("/(tabs)");
			} else {
				setError("Invalid credentials");
			}
		} catch (err: any) {
			setError(err.errors?.[0]?.message || "Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image
					source={require("@/assets/images/react-logo.png")}
					style={styles.logo}
					resizeMode="contain"
				/>
				<Text style={styles.title}>Welcome Back</Text>
				<Text style={styles.subtitle}>Sign in to continue</Text>
			</View>

			<View style={styles.form}>
				<TextInput
					label="Email"
					value={emailAddress}
					onChangeText={setEmailAddress}
					placeholder="Enter your email"
					error={error}
				/>

				<TextInput
					label="Password"
					value={password}
					onChangeText={setPassword}
					placeholder="Enter your password"
					secureTextEntry
				/>

				<Button title="Sign In" onPress={onSignInPress} isLoading={isLoading} />

				<View style={styles.footer}>
					<Text style={styles.footerText}>Don't have an account?</Text>
					<Link href="/sign-up" asChild>
						<Text style={styles.link}>Sign up</Text>
					</Link>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background.light,
		padding: SPACING.xl,
	},
	header: {
		alignItems: "center",
		marginTop: SPACING.xl * 2,
		marginBottom: SPACING.xl,
	},
	logo: {
		width: 150,
		height: 50,
		marginBottom: SPACING.lg,
	},
	title: {
		fontSize: FONT_SIZES["3xl"],
		fontWeight: "bold",
		color: COLORS.text.light,
		marginBottom: SPACING.xs,
	},
	subtitle: {
		fontSize: FONT_SIZES.md,
		color: COLORS.text.light + "80",
	},
	form: {
		gap: SPACING.md,
	},
	footer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: SPACING.xl,
		gap: SPACING.xs,
	},
	footerText: {
		color: COLORS.text.light + "80",
		fontSize: FONT_SIZES.md,
	},
	link: {
		color: COLORS.primary.DEFAULT,
		fontSize: FONT_SIZES.md,
		fontWeight: "600",
	},
});
