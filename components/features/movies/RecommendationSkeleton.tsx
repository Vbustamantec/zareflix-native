import React from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";

import { Skeleton } from "@/components/ui/Skeletons";
import { SPACING } from "@/constants/theme";

const { width } = Dimensions.get("window");
const CARD_GAP = SPACING.sm;
const VISIBLE_CARDS = 2.5;
const CARD_WIDTH =
	(width - SPACING.lg * 2 - CARD_GAP * (VISIBLE_CARDS - 1)) / VISIBLE_CARDS;
const POSTER_HEIGHT = CARD_WIDTH * 1.5;

export const RecommendationSkeleton = () => {
	return (
		<View style={styles.container}>
			<Skeleton width={120} height={24} style={styles.titleSkeleton} />
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
			>
				{[...Array(4)].map((_, index) => (
					<View key={index} style={[styles.card, index < 3 && styles.cardGap]}>
						<Skeleton width={CARD_WIDTH} height={POSTER_HEIGHT} />
						<View style={styles.infoContainer}>
							<Skeleton
								width={CARD_WIDTH - SPACING.md * 2}
								height={16}
								style={styles.titleLine}
							/>
							<Skeleton
								width={(CARD_WIDTH - SPACING.md * 2) * 0.5}
								height={14}
							/>
						</View>
					</View>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: SPACING.lg,
	},
	titleSkeleton: {
		marginLeft: SPACING.lg,
		marginBottom: SPACING.md,
	},
	scrollContent: {
		paddingHorizontal: SPACING.lg,
		paddingBottom: SPACING.lg,
	},
	card: {
		width: CARD_WIDTH,
	},
	cardGap: {
		marginRight: CARD_GAP,
	},
	infoContainer: {
		padding: SPACING.sm,
		gap: SPACING.xs,
	},
	titleLine: {
		marginBottom: SPACING.xs,
	},
});
