import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { useQuery } from "@tanstack/react-query";

import { getRecommendations } from "@/services/api";

import { COLORS, SPACING, FONT_SIZES } from "@/constants/theme";

import { RecommendationCard } from "@/components/features/movies/RecommendationCard";
import { RecommendationSkeleton } from "./RecommendationSkeleton";

interface MovieRecommendationsProps {
	movieId: string;
}

export const MovieRecommendations = ({
	movieId,
}: MovieRecommendationsProps) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["recommendations", movieId],
		queryFn: () => getRecommendations(movieId),
		enabled: Boolean(movieId),
	});

	if (isLoading) {
		return <RecommendationSkeleton />;
	}

	if (error || !data?.success || !data.data.recommendations?.length) {
		return null;
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>More Like This</Text>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
			>
				{data.data.recommendations.map((movie) => (
					<RecommendationCard key={movie.imdbID} movie={movie} />
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: SPACING.lg,
	},
	title: {
		fontSize: FONT_SIZES.md,
		fontWeight: "600",
		color: COLORS.text.light,
		paddingHorizontal: SPACING.lg,
		marginBottom: SPACING.md,
	},
	scrollContent: {
		paddingHorizontal: SPACING.lg,
		paddingBottom: SPACING.lg,
		gap: SPACING.md,
	},
});
