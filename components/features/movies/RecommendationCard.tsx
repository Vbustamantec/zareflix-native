import React from "react";
import {
	View,
	Text,
	Image,
	Pressable,
	StyleSheet,
	Dimensions,
} from "react-native";

import { Link } from "expo-router";

import { COLORS, SPACING, FONT_SIZES } from "@/constants/theme";
import { Movie } from "@/types/types";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - SPACING.lg * 3) / 2.5;
const POSTER_HEIGHT = CARD_WIDTH * 1.5;

interface RecommendationCardProps {
	movie: Movie;
}

export const RecommendationCard = ({ movie }: RecommendationCardProps) => {
	return (
		<Link href={`/movie/${movie.imdbID}` as const} asChild>
			<Pressable
				style={({ pressed }) => [styles.container, pressed && styles.pressed]}
			>
				<View style={styles.posterContainer}>
					<Image
						source={{
							uri:
								movie.Poster !== "N/A"
									? movie.Poster
									: "https://via.placeholder.com/300x445",
						}}
						style={styles.poster}
						resizeMode="cover"
					/>
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.title} numberOfLines={2}>
						{movie.Title}
					</Text>
					<Text style={styles.year}>{movie.Year}</Text>
				</View>
			</Pressable>
		</Link>
	);
};

const styles = StyleSheet.create({
	container: {
		width: CARD_WIDTH,
		backgroundColor: COLORS.card.light,
		borderRadius: 8,
		overflow: "hidden",
		marginRight: SPACING.md,
	},
	posterContainer: {
		width: CARD_WIDTH,
		height: POSTER_HEIGHT,
		backgroundColor: COLORS.card.dark,
		borderRadius: 8,
		overflow: "hidden",
	},
	poster: {
		width: "100%",
		height: "100%",
	},
	infoContainer: {
		padding: SPACING.xs,
		height: 60,
	},
	title: {
		fontSize: FONT_SIZES.sm,
		fontWeight: "500",
		color: COLORS.text.light,
		marginBottom: 2,
		maxWidth: 125,
	},
	year: {
		fontSize: FONT_SIZES.xs,
		color: COLORS.text.light + "70",
	},
	pressed: {
		opacity: 0.8,
		transform: [{ scale: 0.98 }],
	},
});
