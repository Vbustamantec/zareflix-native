import { ScrollView, View, Image, StyleSheet, Dimensions } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { SignedIn, useUser, useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { COLORS, SPACING } from "@/constants/theme";
import { searchMovies } from "@/services/api";
import { WelcomeSection } from "@/components/features/Sections/WelcomeSection";
import { SectionHeader } from "@/components/features/Sections/SectionHeader";
import { FeaturedMovieCard } from "@/components/features/favorites/FeaturedMovieCard";
import { TrendingMovieCard } from "@/components/features/favorites/TrendingMovieCard";

const FEATURE_CARD_WIDTH = Dimensions.get("window").width - SPACING.lg * 2;

export default function HomeScreen() {
	const { user } = useUser();
	const { signOut } = useAuth();
	const router = useRouter();

	const { data: featuredMovies } = useQuery({
		queryKey: ["featured"],
		queryFn: () => searchMovies("action", 1),
	});

	const { data: trendingMovies } = useQuery({
		queryKey: ["trending"],
		queryFn: () => searchMovies("2024", 1),
	});

	const username = user?.emailAddresses[0].emailAddress.split("@")[0] || "";

	const handleSignOut = async () => {
		try {
			await signOut();
			router.replace("/sign-in");
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<SignedIn>
				<View style={styles.header}>
					<Image
						source={require("@/assets/images/logo.png")}
						style={styles.logo}
						resizeMode="contain"
					/>
				</View>

				<WelcomeSection username={username} onSignOut={handleSignOut} />

				<View style={styles.section}>
					<SectionHeader title="Featured" />
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.featuredList}
						decelerationRate="fast"
						snapToAlignment="start"
						snapToInterval={FEATURE_CARD_WIDTH + SPACING.md}
					>
						{featuredMovies?.Search?.map((movie) => (
							<FeaturedMovieCard key={movie.imdbID} movie={movie} />
						))}
					</ScrollView>
				</View>

				<View style={styles.section}>
					<SectionHeader title="Trending Now" />
					<View style={styles.trendingGrid}>
						{trendingMovies?.Search?.slice(0, 4).map((movie) => (
							<TrendingMovieCard key={movie.imdbID} movie={movie} />
						))}
					</View>
				</View>
			</SignedIn>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background.light,
	},
	header: {
		paddingHorizontal: SPACING.lg,
		alignItems: "center",
		marginBottom: SPACING.md,
	},
	logo: {
		width: 150,
		height: 40,
	},
	section: {
		marginBottom: SPACING.xl,
	},
	featuredList: {
		paddingHorizontal: SPACING.lg,
	},
	trendingGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		paddingHorizontal: SPACING.lg,
		gap: SPACING.md,
	},
});
