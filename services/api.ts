const OMDB_API_KEY = "cb3c0b9e";
const BASE_URL = "http://www.omdbapi.com";

export interface Movie {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
}

export interface MovieDetails extends Movie {
	Plot: string;
	Director: string;
	Actors: string;
	Genre: string;
	Runtime: string;
	imdbRating: string;
	Awards: string;
}

export interface SearchResponse {
	Search: Movie[];
	totalResults: string;
	Response: string;
}

export const searchMovies = async (
	query: string,
	page = 1
): Promise<SearchResponse> => {
	try {
		const response = await fetch(
			`${BASE_URL}/?apikey=${OMDB_API_KEY}&s=${query}&page=${page}`
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
		const response = await fetch(
			`${BASE_URL}/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
		);
		const data = await response.json();

		if (data.Response === "False") {
			throw new Error(data.Error || "Movie not found");
		}

		return data;
	} catch (error) {
		throw error;
	}
};
