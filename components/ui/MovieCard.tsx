import React from "react";
import { View, Pressable, Image, StyleSheet, Dimensions } from "react-native";
import { Link } from "expo-router";
import { motion } from "framer-motion";
import { Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import FavoriteButton from "@/components/ui/FavoriteButton";
import { theme } from "@/styles/theme";
import { Movie } from "@/types/types";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - theme.spacing.lg * 3) / 2;
const POSTER_ASPECT_RATIO = 3 / 2;

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link href={`/movie/${movie.imdbID}` as const} asChild>
      <Pressable>
        {({ pressed }) => (
          <Card
            style={[
              styles.container,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x445?text=No+Poster",
                }}
                style={styles.poster}
                resizeMode="cover"
              />
              <View style={styles.favoriteButton}>
                <FavoriteButton movie={movie} />
              </View>
            </View>

            <View style={styles.info}>
              <Text
                variant="h4"
                weight="semibold"
                numberOfLines={2}
                style={styles.title}
              >
                {movie.Title}
              </Text>
              <Text
                variant="caption"
                color="secondary"
                style={styles.year}
              >
                {movie.Year}
              </Text>
            </View>
          </Card>
        )}
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.lg,
    overflow: "hidden",
    ...theme.shadows.md,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  imageContainer: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * POSTER_ASPECT_RATIO,
    position: "relative",
  },
  poster: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
  },
  favoriteButton: {
    position: "absolute",
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    zIndex: 10,
  },
  info: {
    padding: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  title: {
    marginBottom: theme.spacing.xs,
  },
  year: {
    opacity: 0.7,
  },
});