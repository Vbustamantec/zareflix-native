import React from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, SPACING, FONT_SIZES } from "@/constants/theme";
import { useFavorites } from "@/hooks/useFavorites";
import { FavoriteCard } from "@/components/features/favorites/FavoriteCard";
import EmptyFavorites from "@/components/features/favorites/EmptyFavorites";

export default function FavoritesScreen() {
	const insets = useSafeAreaInsets();
	const {
		favorites,
		isLoading,
		error,
		removeFavorite,
		updateFavorite,
		isRemoving,
		isUpdating,
		refetch,
	} = useFavorites();

	if (error) {
		return (
			<View style={[styles.container, { paddingTop: insets.top }]}>
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>
						Error finding favorites. Please try again.
					</Text>
				</View>
			</View>
		);
	}

	if (!isLoading && (!favorites || favorites.length === 0)) {
		return <EmptyFavorites />;
	}

	return (
		<ScrollView
			style={[styles.container, { paddingTop: insets.top + SPACING.md }]}
			refreshControl={
				<RefreshControl refreshing={isLoading} onRefresh={refetch} />
			}
		>
			<Text style={styles.title}>My Favorites</Text>

			<View style={styles.grid}>
				{favorites?.map(
					(favorite: {
						_id: any;
						movieId: string;
						title: string;
						poster: string;
						year: string;
						personalNotes?: string | undefined;
					}) => (
						<FavoriteCard
							key={favorite._id}
							favorite={favorite}
							onRemove={() => removeFavorite(favorite._id)}
							onUpdate={(data) =>
								updateFavorite({
									id: favorite._id,
									data: {
										...data,
									},
								})
							}
							isRemoving={isRemoving}
							isUpdating={isUpdating}
						/>
					)
				)}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background.light,
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: SPACING.xl,
	},
	errorText: {
		fontSize: FONT_SIZES.md,
		color: COLORS.primary.DEFAULT,
		textAlign: "center",
	},
	title: {
		fontSize: FONT_SIZES["2xl"],
		fontWeight: "bold",
		color: COLORS.text.light,
		marginBottom: SPACING.lg,
		paddingHorizontal: SPACING.lg,
	},
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: SPACING.lg,
		padding: SPACING.lg,
		marginBottom: 75,
	},
});
