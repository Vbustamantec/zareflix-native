import { Link } from "expo-router";
import { Image, Pressable, Text, StyleSheet, Dimensions } from "react-native";
import { SPACING, FONT_SIZES, COLORS } from "@/constants/theme";
import { MovieCardProps } from "@/types/types";

const { width } = Dimensions.get("window");
const TRENDING_CARD_WIDTH = (width - SPACING.lg * 3) / 2;

export const TrendingMovieCard = ({ movie }: MovieCardProps) => (
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

const styles = StyleSheet.create({
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
