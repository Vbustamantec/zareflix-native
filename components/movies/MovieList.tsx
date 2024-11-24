import React from "react";
import {
	View,
	FlatList,
	ActivityIndicator,
	Text,
	StyleSheet,
	Pressable,
	Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MovieCard } from "@/components/ui/MovieCard";
import { Movie } from "@/services/api";
import { COLORS, SPACING, FONT_SIZES } from "@/constants/theme";

const { width } = Dimensions.get("window");

interface MovieListProps {
	movies: Movie[];
	isLoading: boolean;
	error: string | null;
	onRetry?: () => void;
}

export const MovieList = ({
	movies,
	isLoading,
	error,
	onRetry,
}: MovieListProps) => {
	if (isLoading) {
		return (
			<View style={styles.centerContainer}>
				<ActivityIndicator size="large" color={COLORS.primary.DEFAULT} />
				<Text style={styles.loadingText}>Searching movies...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.centerContainer}>
				<Ionicons
					name="alert-circle-outline"
					size={48}
					color={COLORS.primary.DEFAULT}
				/>
				<Text style={styles.errorText}>{error}</Text>
				{onRetry && (
					<Pressable
						onPress={onRetry}
						style={({ pressed }) => [
							styles.retryButton,
							pressed && styles.pressed,
						]}
					>
						<Ionicons name="refresh" size={20} color="white" />
						<Text style={styles.retryText}>Try Again</Text>
					</Pressable>
				)}
			</View>
		);
	}

	if (movies.length === 0) {
		return (
			<View style={styles.centerContainer}>
				<Ionicons
					name="film-outline"
					size={64}
					color={COLORS.text.light + "40"}
				/>
				<Text style={styles.emptyText}>Search for your favorite movies</Text>
				<Text style={styles.emptySubtext}>
					Find great movies to watch tonight
				</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={movies}
			keyExtractor={(item) => item.imdbID}
			renderItem={({ item }) => <MovieCard movie={item}  />}
			contentContainerStyle={styles.listContent}
			numColumns={2}
			columnWrapperStyle={styles.columnWrapper}
			showsVerticalScrollIndicator={false}
			initialNumToRender={4}
			maxToRenderPerBatch={4}
			windowSize={5}
		/>
	);
};

const styles = StyleSheet.create({
	centerContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: SPACING.xl,
	},
	listContent: {
		paddingHorizontal: SPACING.md,
		paddingTop: SPACING.md,
		paddingBottom: SPACING.xl * 2,
	},
	columnWrapper: {
		justifyContent: "space-between",
	},
	errorText: {
		color: COLORS.primary.DEFAULT,
		fontSize: FONT_SIZES.md,
		textAlign: "center",
		marginVertical: SPACING.md,
	},
	loadingText: {
		marginTop: SPACING.md,
		color: COLORS.text.light + "80",
		fontSize: FONT_SIZES.md,
	},
	emptyText: {
		color: COLORS.text.light,
		fontSize: FONT_SIZES.lg,
		fontWeight: "600",
		textAlign: "center",
		marginTop: SPACING.lg,
	},
	emptySubtext: {
		color: COLORS.text.light + "60",
		fontSize: FONT_SIZES.md,
		textAlign: "center",
		marginTop: SPACING.xs,
	},
	retryButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.primary.DEFAULT,
		paddingHorizontal: SPACING.lg,
		paddingVertical: SPACING.md,
		borderRadius: SPACING.sm,
		marginTop: SPACING.md,
		gap: SPACING.xs,
	},
	retryText: {
		color: "white",
		fontSize: FONT_SIZES.md,
		fontWeight: "600",
	},
	pressed: {
		opacity: 0.8,
		transform: [{ scale: 0.98 }],
	},
});
