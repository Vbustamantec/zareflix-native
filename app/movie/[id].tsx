import React from "react";
import {
	View,
	ScrollView,
	Image,
	Text,
	StyleSheet,
	Dimensions,
	Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "@/services/api";
import { COLORS, SPACING, FONT_SIZES } from "@/constants/theme";
import { MovieRecommendations } from "@/components/movies/MovieRecommendations";
import MovieActions from "@/components/movies/MovieActions";

const { width } = Dimensions.get("window");
const POSTER_HEIGHT = width * 1.5;

export default function MovieDetailScreen() {
	const { id } = useLocalSearchParams();
	const router = useRouter();
	const insets = useSafeAreaInsets();

	const {
		data: movie,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["movie", id],
		queryFn: () => getMovieById(id as string),
	});

	if (isLoading || !movie) {
		return (
			<View style={styles.loadingContainer}>
				<Ionicons
					name="film-outline"
					size={48}
					color={COLORS.primary.DEFAULT}
				/>
				<Text style={styles.loadingText}>Loading movie details...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.errorContainer}>
				<Ionicons
					name="alert-circle-outline"
					size={48}
					color={COLORS.primary.DEFAULT}
				/>
				<Text style={styles.errorText}>Failed to load movie details</Text>
				<Pressable
					style={({ pressed }) => [
						styles.retryButton,
						pressed && styles.pressed,
					]}
					onPress={() => router.back()}
				>
					<Text style={styles.buttonText}>Go Back</Text>
				</Pressable>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
				bounces={false}
				contentContainerStyle={{
					paddingBottom: insets.bottom + SPACING.xl,
				}}
			>
				<View>
					<Image
						source={{
							uri:
								movie.Poster !== "N/A"
									? movie.Poster
									: "https://via.placeholder.com/300x445?text=No+Poster",
						}}
						style={[styles.poster, { height: POSTER_HEIGHT }]}
						resizeMode="cover"
					/>

					<Pressable
						style={[styles.backButton, { top: insets.top + SPACING.md }]}
						onPress={() => router.back()}
					>
						<Ionicons name="arrow-back" size={24} color="white" />
					</Pressable>
				</View>

				<View style={styles.content}>
					<Text style={styles.title}>{movie.Title}</Text>

					<View style={styles.metaInfo}>
						<Text style={styles.year}>{movie.Year}</Text>
						<Text style={styles.dot}>•</Text>
						<Text style={styles.runtime}>{movie.Runtime}</Text>
						<Text style={styles.dot}>•</Text>
						<View style={styles.ratingContainer}>
							<Ionicons name="star" size={16} color={COLORS.primary.DEFAULT} />
							<Text style={styles.rating}>{movie.imdbRating}/10</Text>
						</View>
					</View>

					<View style={styles.genreContainer}>
						{movie.Genre.split(", ").map((genre, index) => (
							<View key={index} style={styles.genreTag}>
								<Text style={styles.genreText}>{genre}</Text>
							</View>
						))}
					</View>

					<MovieActions movie={movie} />
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Plot</Text>
						<Text style={styles.plot}>{movie.Plot}</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Cast</Text>
						<Text style={styles.info}>{movie.Actors}</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Director</Text>
						<Text style={styles.info}>{movie.Director}</Text>
					</View>

					{movie.Awards !== "N/A" && (
						<View style={[styles.section, styles.awardsSection]}>
							<Ionicons
								name="trophy"
								size={24}
								color={COLORS.primary.DEFAULT}
							/>
							<Text style={styles.awards}>{movie.Awards}</Text>
						</View>
					)}
				</View>
				<MovieRecommendations movieId={id as string} />
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background.light,
	},
	scrollView: {
		flex: 1,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: SPACING.md,
	},
	loadingText: {
		color: COLORS.text.light,
		fontSize: FONT_SIZES.md,
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: SPACING.xl,
		gap: SPACING.md,
	},
	errorText: {
		color: COLORS.text.light,
		fontSize: FONT_SIZES.md,
		textAlign: "center",
	},
	retryButton: {
		backgroundColor: COLORS.primary.DEFAULT,
		paddingHorizontal: SPACING.xl,
		paddingVertical: SPACING.md,
		borderRadius: SPACING.md,
		marginTop: SPACING.md,
	},
	buttonText: {
		color: "white",
		fontSize: FONT_SIZES.md,
		fontWeight: "600",
	},
	poster: {
		width: "100%",
	},
	backButton: {
		position: "absolute",
		left: SPACING.md,
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	content: {
		padding: SPACING.lg,
		paddingBottom: SPACING.sm,
	},
	title: {
		fontSize: FONT_SIZES["2xl"],
		fontWeight: "bold",
		color: COLORS.text.light,
		marginBottom: SPACING.md,
	},
	metaInfo: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: SPACING.md,
	},
	year: {
		fontSize: FONT_SIZES.md,
		color: COLORS.text.light + "80",
	},
	dot: {
		marginHorizontal: SPACING.sm,
		color: COLORS.text.light + "80",
	},
	runtime: {
		fontSize: FONT_SIZES.md,
		color: COLORS.text.light + "80",
	},
	ratingContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: SPACING.xs,
	},
	rating: {
		fontSize: FONT_SIZES.md,
		color: COLORS.text.light,
		fontWeight: "600",
	},
	genreContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: SPACING.xs,
		marginBottom: SPACING.lg,
	},
	genreTag: {
		backgroundColor: COLORS.primary.DEFAULT + "20",
		paddingHorizontal: SPACING.md,
		paddingVertical: SPACING.xs,
		borderRadius: SPACING.lg,
	},
	genreText: {
		color: COLORS.primary.DEFAULT,
		fontSize: FONT_SIZES.sm,
	},
	section: {
		marginBottom: SPACING.lg,
	},
	sectionTitle: {
		fontSize: FONT_SIZES.lg,
		fontWeight: "600",
		color: COLORS.text.light,
		marginBottom: SPACING.sm,
	},
	plot: {
		fontSize: FONT_SIZES.md,
		color: COLORS.text.light + "90",
		lineHeight: 24,
	},
	info: {
		fontSize: FONT_SIZES.md,
		color: COLORS.text.light + "90",
	},
	awardsSection: {
		backgroundColor: COLORS.primary.DEFAULT + "10",
		padding: SPACING.lg,
		borderRadius: SPACING.md,
		flexDirection: "row",
		alignItems: "center",
		gap: SPACING.md,
	},
	awards: {
		flex: 1,
		fontSize: FONT_SIZES.md,
		color: COLORS.text.light,
		fontWeight: "500",
	},
	pressed: {
		opacity: 0.8,
		transform: [{ scale: 0.98 }],
	},
});
