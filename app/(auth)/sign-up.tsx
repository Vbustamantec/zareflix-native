import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
	View,
	Text,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { COLORS, SPACING, FONT_SIZES } from "@/constants/theme";

export default function SignUpScreen() {
	const { isLoaded, signUp, setActive } = useSignUp();
	const router = useRouter();

	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [pendingVerification, setPendingVerification] = useState(false);
	const [code, setCode] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSignUp = async () => {
		if (!isLoaded) return;
		setIsLoading(true);
		setError("");

		try {
			await signUp.create({
				emailAddress,
				password,
			});

			await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
			setPendingVerification(true);
		} catch (err: any) {
			setError(err.errors?.[0]?.message || "Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};

	const handleVerify = async () => {
		if (!isLoaded) return;
		setIsLoading(true);
		setError("");

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({
				code,
			});

			if (completeSignUp.status === "complete") {
				await setActive({ session: completeSignUp.createdSessionId });
				router.replace("/(tabs)");
			}
		} catch (err: any) {
			setError(err.errors?.[0]?.message || "Invalid verification code");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.headerSection}>
					<Text style={styles.title}>
						{pendingVerification ? "Verify Email" : "Create Account"}
					</Text>
					<Text style={styles.subtitle}>
						{pendingVerification
							? "We sent a verification code to your email"
							: "Sign up to start exploring movies"}
					</Text>
				</View>

				<View style={styles.formSection}>
					{!pendingVerification ? (
						<>
							<TextInput
								value={emailAddress}
								onChangeText={(text) => {
									setError("");
									setEmailAddress(text);
								}}
								placeholder="Email address"
								autoCapitalize="none"
								keyboardType="email-address"
								error={error}
							/>

							<TextInput
								value={password}
								onChangeText={(text) => {
									setError("");
									setPassword(text);
								}}
								placeholder="Password"
								secureTextEntry
								error={error}
							/>

							<Button
								title="Create Account"
								onPress={handleSignUp}
								isLoading={isLoading}
							/>

							<Button
								title="Back to Sign In"
								onPress={() => router.push("/sign-in")}
								variant="secondary"
							/>
						</>
					) : (
						<>
							<TextInput
								value={code}
								onChangeText={(text) => {
									setError("");
									setCode(text);
								}}
								placeholder="Enter verification code"
								keyboardType="number-pad"
								error={error}
							/>

							<Button
								title="Verify Email"
								onPress={handleVerify}
								isLoading={isLoading}
							/>

							<Button
								title="Back to Sign Up"
								onPress={() => setPendingVerification(false)}
								variant="secondary"
							/>
						</>
					)}
				</View>

				{error ? <Text style={styles.errorText}>{error}</Text> : null}
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background.light,
	},
	scrollContent: {
		flexGrow: 1,
		padding: SPACING.xl,
		justifyContent: "center",
	},
	headerSection: {
		alignItems: "center",
		marginBottom: SPACING.xl,
	},
	title: {
		fontSize: FONT_SIZES["3xl"],
		fontWeight: "bold",
		color: COLORS.text.light,
		marginBottom: SPACING.xs,
		textAlign: "center",
	},
	subtitle: {
		fontSize: FONT_SIZES.md,
		color: COLORS.text.light + "80",
		textAlign: "center",
	},
	formSection: {
		gap: SPACING.md,
	},
	errorText: {
		color: COLORS.primary.DEFAULT,
		fontSize: FONT_SIZES.sm,
		textAlign: "center",
		marginTop: SPACING.md,
	},
});
