import { config } from "@/config";
import {
	MovieDetails,
	RecommendationResponse,
	SearchResponse,
} from "@/types/types";

const { key, baseUrl } = config.api.omdb;

export const searchMovies = async (
	query: string,
	page = 1
): Promise<SearchResponse> => {
	try {
		const response = await fetch(
			`${baseUrl}/?apikey=${key}&s=${query}&page=${page}`
		);
		const data = await response.json();

		if (data.Response === "False") {
			throw new Error(data.Error || "Failed to fetch movies");
		}

		return data;
	} catch (error) {
		throw error;
	}
};

export const getMovieById = async (id: string): Promise<MovieDetails> => {
	try {
		const response = await fetch(`${baseUrl}/?apikey=${key}&i=${id}&plot=full`);
		const data = await response.json();

		if (data.Response === "False") {
			throw new Error(data.Error || "Movie not found");
		}

		return data;
	} catch (error) {
		throw error;
	}
};

export const getRecommendations = async (
	movieId: string
): Promise<RecommendationResponse> => {
	try {
		const response = await fetch(
			`https://zareflix-api.onrender.com/recommendations/${movieId}`
		);

		if (!response.ok) {
			throw new Error("Failed to fetch recommendations");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error("Error getting recommendations");
	}
};
