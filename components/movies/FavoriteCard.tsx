import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	Pressable,
	Dimensions,
} from "react-native";
import { Link } from "expo-router";
import { Pencil, Trash2, Save, X } from "lucide-react-native";
import { TextInput } from "@/components/ui/TextInput";
import { COLORS, SPACING, FONT_SIZES } from "@/constants/theme";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - SPACING.lg * 3) / 2;

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
	isRemoving,
}: FavoriteCardProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [editData, setEditData] = useState({
		title: favorite.title,
		notes: favorite.personalNotes || "",
	});

	const handleSave = () => {
		onUpdate({
			title: editData.title,
			personalNotes: editData.notes,
		});
		setIsEditing(false);
	};

	return (
		<View style={styles.container}>
			<Link href={`/movie/${favorite.movieId}` as const} asChild>
				<Pressable style={styles.imageContainer}>
					<Image
						source={{
							uri:
								favorite.poster !== "N/A"
									? favorite.poster
									: "https://via.placeholder.com/300x445",
						}}
						style={styles.image}
						resizeMode="cover"
					/>
					<View style={styles.overlay} />
				</Pressable>
			</Link>

			<View style={styles.content}>
				{isEditing ? (
					<View style={styles.editForm}>
						<TextInput
							value={editData.title}
							onChangeText={(text) => setEditData({ ...editData, title: text })}
							placeholder="Movie title"
							containerStyle={styles.input}
						/>
						<TextInput
							value={editData.notes}
							onChangeText={(text) => setEditData({ ...editData, notes: text })}
							placeholder="Personal notes..."
							multiLine
							numberOfLines={3}
							containerStyle={styles.input}
						/>
						<View style={styles.actions}>
							<Pressable
								onPress={() => setIsEditing(false)}
								style={styles.actionButton}
								disabled={isUpdating}
							>
								<X color={COLORS.text.light} size={20} />
							</Pressable>
							<Pressable
								onPress={handleSave}
								style={[styles.actionButton, styles.saveButton]}
								disabled={isUpdating}
							>
								<Save color="white" size={20} />
							</Pressable>
						</View>
					</View>
				) : (
					<>
						<View style={styles.header}>
							<Text style={styles.title} numberOfLines={2}>
								{favorite.title}
							</Text>
							<Text style={styles.year}>{favorite.year}</Text>
						</View>

						{favorite.personalNotes && (
							<Text style={styles.notes} numberOfLines={3}>
								{favorite.personalNotes}
							</Text>
						)}

						<View style={styles.actions}>
							<Pressable
								onPress={() => setIsEditing(true)}
								style={styles.actionButton}
								disabled={isUpdating}
							>
								<Pencil color={COLORS.text.light} size={20} />
							</Pressable>
							<Pressable
								onPress={onRemove}
								style={[styles.actionButton, styles.deleteButton]}
								disabled={isRemoving}
							>
								<Trash2 color="white" size={20} />
							</Pressable>
						</View>
					</>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: CARD_WIDTH,
		backgroundColor: COLORS.card.light,
		borderRadius: SPACING.md,
		overflow: "hidden",
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
	},
	imageContainer: {
		width: "100%",
		height: CARD_WIDTH * 1.5,
		position: "relative",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	overlay: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: "30%",
		backgroundColor: "rgba(0,0,0,0.3)",
	},
	content: {
		padding: SPACING.md,
	},
	header: {
		marginBottom: SPACING.sm,
	},
	title: {
		fontSize: FONT_SIZES.md,
		fontWeight: "600",
		color: COLORS.text.light,
		marginBottom: SPACING.xs,
	},
	year: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.text.light + "80",
	},
	notes: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.text.light + "90",
		marginBottom: SPACING.md,
	},
	editForm: {
		gap: SPACING.sm,
	},
	input: {
		marginBottom: 0,
	},
	actions: {
		flexDirection: "row",
		justifyContent: "flex-end",
		gap: SPACING.sm,
		marginTop: SPACING.sm,
	},
	actionButton: {
		padding: SPACING.sm,
		borderRadius: SPACING.sm,
		backgroundColor: COLORS.card.dark,
	},
	saveButton: {
		backgroundColor: COLORS.primary.DEFAULT,
	},
	deleteButton: {
		backgroundColor: COLORS.primary.DEFAULT,
	},
});
