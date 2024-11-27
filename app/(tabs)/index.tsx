import React from "react";
import {
	ScrollView,
	View,
	Text,
	Image,
	Pressable,
	StyleSheet,
	Dimensions,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { SignedIn, useUser, useAuth } from "@clerk/clerk-expo";
import Expo from "expo";

import { COLORS, SPACING, FONT_SIZES } from "@/constants/theme";
import { searchMovies } from "@/services/api";
import { Movie } from "@/types/types";

const { width } = Dimensions.get("window");
const FEATURE_CARD_WIDTH = width - SPACING.lg * 2;
const TRENDING_CARD_WIDTH = (width - SPACING.lg * 3) / 2;

interface MovieCardProps {
	movie: Movie;
}

const FeaturedMovieCard = ({ movie }: MovieCardProps) => (
	<Link href={`/movie/${movie.imdbID}` as const} asChild>
		<Pressable style={styles.featuredCard}>
			<Image
				source={{
					uri:
						movie.Poster !== "N/A"
							? movie.Poster
							: "https://via.placeholder.com/300x445",
				}}
				style={styles.featuredImage}
				resizeMode="cover"
			/>
			<View style={styles.featuredGradient}>
				<Text style={styles.featuredTitle}>{movie.Title}</Text>
			</View>
		</Pressable>
	</Link>
);

const TrendingMovieCard = ({ movie }: MovieCardProps) => (
	<Link
		href={`/movie/${movie.imdbID}` as const}
		asChild
		style={styles.trendingCard}
	>
		<Pressable>
			<Image
				source={{
					uri:
						movie.Poster !== "N/A"
							? movie.Poster
							: "https://via.placeholder.com/300x445",
				}}
				style={styles.trendingImage}
				resizeMode="cover"
			/>
			<Text style={styles.trendingTitle} numberOfLines={2}>
				{movie.Title}
			</Text>
		</Pressable>
	</Link>
);

export default function HomeScreen() {
	const insets = useSafeAreaInsets();
	const tabBarHeight = useBottomTabBarHeight();
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
		<ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
			<SignedIn>
				<View style={styles.header}>
					<Image
						source={require("@/assets/images/logo.png")}
						style={styles.logo}
						resizeMode="contain"
					/>
				</View>

				<View style={styles.welcomeSection}>
					<View>
						<Text style={styles.greeting}>Welcome back,</Text>
						<Text style={styles.username}>{username}</Text>
					</View>
					<Pressable onPress={handleSignOut} style={styles.signOutButton}>
						<Text style={styles.signOutText}>Sign out</Text>
						<Ionicons
							name="chevron-forward"
							size={16}
							color={COLORS.primary.DEFAULT}
						/>
					</Pressable>
				</View>

				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Featured</Text>
						<Link href="/search" asChild>
							<Pressable style={styles.seeAllButton}>
								<Text style={styles.seeAllText}>See all</Text>
								<Ionicons
									name="chevron-forward"
									size={16}
									color={COLORS.primary.DEFAULT}
								/>
							</Pressable>
						</Link>
					</View>

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
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Trending Now</Text>
					</View>

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
	welcomeSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: SPACING.lg,
		marginBottom: SPACING.xl,
	},
	greeting: {
		fontSize: FONT_SIZES.md,
		color: COLORS.text.light + "80",
	},
	username: {
		fontSize: FONT_SIZES.xl,
		fontWeight: "bold",
		color: COLORS.text.light,
	},
	signOutButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: SPACING.xs,
	},
	signOutText: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.primary.DEFAULT,
	},
	section: {
		marginBottom: SPACING.xl,
	},
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: SPACING.lg,
		marginBottom: SPACING.md,
	},
	sectionTitle: {
		fontSize: FONT_SIZES.lg,
		fontWeight: "bold",
		color: COLORS.text.light,
	},
	seeAllButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: SPACING.xs,
	},
	seeAllText: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.primary.DEFAULT,
	},
	// Featured styles
	featuredList: {
		paddingHorizontal: SPACING.lg,
	},
	featuredCard: {
		width: FEATURE_CARD_WIDTH,
		height: FEATURE_CARD_WIDTH * 0.6,
		borderRadius: SPACING.md,
		overflow: "hidden",
		marginRight: SPACING.md,
	},
	featuredImage: {
		width: "100%",
		height: "100%",
	},
	featuredGradient: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		padding: SPACING.md,
		paddingBottom: SPACING.lg,
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	featuredTitle: {
		fontSize: FONT_SIZES.xl,
		fontWeight: "bold",
		color: "white",
	},
	// Trending styles
	trendingGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		paddingHorizontal: SPACING.lg,
		gap: SPACING.md,
	},
	trendingCard: {
		width: TRENDING_CARD_WIDTH,
	},
	trendingImage: {
		width: "100%",
		aspectRatio: 2 / 3,
		borderRadius: SPACING.md,
		marginBottom: SPACING.sm,
	},
	trendingTitle: {
		fontSize: FONT_SIZES.md,
		color: COLORS.text.light,
		fontWeight: "500",
	},
});
