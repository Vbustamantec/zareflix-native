import React, { useEffect, useRef } from "react";
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	ActivityIndicator,
	Animated,
} from "react-native";
import { Heart } from "lucide-react-native";
import { COLORS, SPACING, FONT_SIZES } from "@/constants/theme";
import { useFavorites } from "@/hooks/useFavorites";
import { MovieDTO } from "@/types/types";

interface FavoriteButtonProps {
	movie: {
		imdbID: string;
		Title: string;
		Poster: string;
		Year: string;
	};
}

export const FavoriteButton = ({ movie }: FavoriteButtonProps) => {
	const { favorites, addFavorite, removeFavorite, isAdding, isRemoving } =
		useFavorites();
	const scaleAnim = useRef(new Animated.Value(1)).current;

	const isFavorite = favorites?.some(
		(fav: { movieId: string }) => fav.movieId === movie.imdbID
	);
	const isLoading = isAdding || isRemoving;

	useEffect(() => {
		if (isLoading) {
			Animated.sequence([
				Animated.timing(scaleAnim, {
					toValue: 0.95,
					duration: 200,
					useNativeDriver: true,
				}),
				Animated.timing(scaleAnim, {
					toValue: 1,
					duration: 200,
					useNativeDriver: true,
				}),
			]).start();
		}
	}, [isLoading]);

	const handleToggleFavorite = async () => {
		if (isFavorite) {
			const favorite = favorites.find(
				(fav: { movieId: string }) => fav.movieId === movie.imdbID
			);
			if (favorite) {
				await removeFavorite(favorite._id);
			}
		} else {
			const movieData: MovieDTO = {
				movieId: movie.imdbID,
				title: movie.Title,
				poster: movie.Poster,
				year: movie.Year,
			};
			await addFavorite(movieData);
		}
	};

	return (
		<View style={styles.container}>
			<Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
				<Pressable
					onPress={handleToggleFavorite}
					disabled={isLoading}
					style={({ pressed }) => [
						styles.favoriteButton,
						isFavorite && styles.favoriteActive,
						pressed && styles.buttonPressed,
					]}
				>
					{isLoading ? (
						<ActivityIndicator
							color={isFavorite ? "white" : COLORS.primary.DEFAULT}
							size="small"
						/>
					) : (
						<Heart
							size={24}
							color={isFavorite ? "white" : COLORS.primary.DEFAULT}
							fill={isFavorite ? "white" : "transparent"}
						/>
					)}
					<Text
						style={[
							styles.favoriteText,
							isFavorite && styles.favoriteActiveText,
						]}
					>
						{isLoading
							? isFavorite
								? "Removing..."
								: "Adding..."
							: isFavorite
							? "Added to Favorites"
							: "Add to Favorites"}
					</Text>
				</Pressable>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: SPACING.lg,
		marginBottom: SPACING.lg,
	},
	favoriteButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
		padding: SPACING.md,
		borderRadius: SPACING.lg,
		borderWidth: 1,
		borderColor: COLORS.primary.DEFAULT,
		gap: SPACING.sm,
		minHeight: 52,
	},
	favoriteActive: {
		backgroundColor: COLORS.primary.DEFAULT,
		borderColor: COLORS.primary.DEFAULT,
	},
	favoriteText: {
		fontSize: FONT_SIZES.md,
		fontWeight: "600",
		color: COLORS.primary.DEFAULT,
	},
	favoriteActiveText: {
		color: "white",
	},
	buttonPressed: {
		opacity: 0.8,
	},
});

export default FavoriteButton;
