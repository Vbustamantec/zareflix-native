import React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	Pressable,
	Dimensions,
	Animated,
} from "react-native";
import { Link } from "expo-router";
import { Pencil, Trash2, Save, X } from "lucide-react-native";
import { TextInput } from "@/components/ui/TextInput";
import { COLORS, SPACING, FONT_SIZES } from "@/constants/theme";
import { Button } from "@/components/ui/Button";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - SPACING.lg * 2;
const CARD_HEIGHT = 200;

interface FavoriteCardProps {
	favorite: {
		_id: string;
		movieId: string;
		title: string;
		poster: string;
		year: string;
		personalNotes?: string;
	};
	onUpdate: (data: { title: string; personalNotes: string }) => void;
	onRemove: () => void;
	isUpdating?: boolean;
	isRemoving?: boolean;
}

export function FavoriteCard({
	favorite,
	onUpdate,
	onRemove,
	isUpdating,
}: FavoriteCardProps) {
	const [isEditing, setIsEditing] = React.useState(false);
	const [editData, setEditData] = React.useState({
		title: favorite.title,
		notes: favorite.personalNotes || "",
	});

	const scaleAnim = React.useRef(new Animated.Value(1)).current;

	const handlePressIn = () => {
		Animated.spring(scaleAnim, {
			toValue: 0.98,
			useNativeDriver: true,
		}).start();
	};

	const handlePressOut = () => {
		Animated.spring(scaleAnim, {
			toValue: 1,
			useNativeDriver: true,
		}).start();
	};

	return (
		<Animated.View
			style={[
				styles.container,
				{
					transform: [{ scale: scaleAnim }],
				},
			]}
		>
			<Link href={`/movie/${favorite.movieId}` as const} asChild>
				<Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
					<View style={styles.card}>
						<Image
							source={{
								uri:
									favorite.poster !== "N/A"
										? favorite.poster
										: "https://via.placeholder.com/300x445",
							}}
							style={styles.poster}
							resizeMode="cover"
						/>

						<View style={styles.content}>
							<View style={styles.header}>
								<Text style={styles.title} numberOfLines={2}>
									{favorite.title}
								</Text>
								<Text style={styles.year}>{favorite.year}</Text>
							</View>

							{favorite.personalNotes && (
								<Text style={styles.notes} numberOfLines={2}>
									{favorite.personalNotes}
								</Text>
							)}

							<View style={styles.actions}>
								<Pressable
									onPress={() => setIsEditing(true)}
									style={styles.actionButton}
								>
									<Pencil size={20} color={COLORS.text.light} />
								</Pressable>
								<Pressable
									onPress={onRemove}
									style={[styles.actionButton, styles.deleteButton]}
								>
									<Trash2 size={20} color="white" />
								</Pressable>
							</View>
						</View>
					</View>
				</Pressable>
			</Link>

			{isEditing && (
				<View style={styles.editForm}>
					<TextInput
						value={editData.title}
						onChangeText={(text) => setEditData({ ...editData, title: text })}
						placeholder="Movie title"
						style={styles.editInput}
					/>
					<TextInput
						value={editData.notes}
						onChangeText={(text) => setEditData({ ...editData, notes: text })}
						placeholder="Add some notes..."
						multiLine
						style={styles.editInput}
					/>
					<View style={styles.editActions}>
						<Button
							title="Save"
							onPress={() => {
								onUpdate({
									title: editData.title,
									personalNotes: editData.notes,
								});
								setIsEditing(false);
							}}
							isLoading={isUpdating}
						/>
					</View>
				</View>
			)}
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: SPACING.md,
	},
	card: {
		width: CARD_WIDTH,
		height: CARD_HEIGHT,
		backgroundColor: COLORS.card.light,
		borderRadius: SPACING.md,
		flexDirection: "row",
		overflow: "hidden",
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	poster: {
		width: 140,
		height: "100%",
	},
	editInput: {
		marginBottom: SPACING.sm,
	},
	content: {
		flex: 1,
		padding: SPACING.md,
		justifyContent: "space-between",
	},
	header: {
		marginBottom: SPACING.sm,
	},
	title: {
		fontSize: FONT_SIZES.lg,
		fontWeight: "600",
		color: COLORS.text.light,
		marginBottom: SPACING.xs,
	},
	year: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.text.light + "80",
	},
	notes: {
		fontSize: FONT_SIZES.md,
		color: COLORS.text.light + "90",
		flex: 1,
	},
	actions: {
		flexDirection: "row",
		justifyContent: "flex-end",
		gap: SPACING.sm,
		marginTop: SPACING.md,
	},
	actionButton: {
		padding: SPACING.sm,
		borderRadius: SPACING.md,
		backgroundColor: COLORS.card.light,
	},
	deleteButton: {
		backgroundColor: COLORS.primary.DEFAULT,
	},
	editForm: {
		padding: SPACING.md,
		backgroundColor: COLORS.card.light,
		borderRadius: SPACING.md,
		marginTop: SPACING.sm,
		gap: SPACING.md,
	},
	editActions: {
		flexDirection: "row",
		justifyContent: "flex-end",
		gap: SPACING.md,
	},
	editButton: {
		flexDirection: "row",
		alignItems: "center",
		padding: SPACING.sm,
		borderRadius: SPACING.md,
		backgroundColor: COLORS.card.light,
		gap: SPACING.xs,
	},
	saveButton: {
		backgroundColor: COLORS.primary.DEFAULT,
	},
	editButtonText: {
		color: COLORS.text.light,
		fontSize: FONT_SIZES.sm,
		fontWeight: "500",
	},
	saveButtonText: {
		color: "white",
		fontSize: FONT_SIZES.sm,
		fontWeight: "500",
	},
});
