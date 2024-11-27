import { Link } from "expo-router";
import {
	Image,
	Pressable,
	View,
	Text,
	StyleSheet,
	Dimensions,
} from "react-native";
import { SPACING, FONT_SIZES } from "@/constants/theme";
import { MovieCardProps } from "@/types/types";

const { width } = Dimensions.get("window");
const FEATURE_CARD_WIDTH = width - SPACING.lg * 2;

export const FeaturedMovieCard = ({ movie }: MovieCardProps) => (
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

const styles = StyleSheet.create({
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
});
