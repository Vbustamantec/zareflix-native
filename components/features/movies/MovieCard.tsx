import React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	Pressable,
	Dimensions,
} from "react-native";

import { Link } from "expo-router";

import { Movie } from "@/types/types";
import { COLORS, SPACING, FONT_SIZES } from "@/constants/theme";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - SPACING.md * 3) / 2;
const POSTER_ASPECT_RATIO = 3 / 2;

interface MovieCardProps {
	movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
	return (
		<Link href={`/movie/${movie.imdbID}` as const} asChild>
			<Pressable
				style={({ pressed }) => [styles.container, pressed && styles.pressed]}
			>
				<View style={styles.imageContainer}>
					<Image
						source={{
							uri:
								movie.Poster !== "N/A"
									? movie.Poster
									: "https://via.placeholder.com/300x445?text=No+Poster",
						}}
						style={styles.poster}
						resizeMode="cover"
					/>
				</View>

				<View style={styles.info}>
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
		marginBottom: SPACING.md,
		borderRadius: SPACING.sm,
		backgroundColor: COLORS.card.light,
		overflow: "hidden",
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
	},
	imageContainer: {
		width: CARD_WIDTH,
		height: CARD_WIDTH * POSTER_ASPECT_RATIO,
		position: "relative",
	},
	poster: {
		width: "100%",
		height: "100%",
	},
	info: {
		padding: SPACING.sm,
	},
	title: {
		fontSize: FONT_SIZES.md,
		fontWeight: "600",
		color: COLORS.text.light,
		marginBottom: SPACING.xs,
		maxWidth: 150,
	},
	year: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.text.light + "80",
	},
	pressed: {
		opacity: 0.9,
		transform: [{ scale: 0.98 }],
	},
});
