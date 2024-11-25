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

export interface RecommendationResponse {
	success: boolean;
	data: {
		movie: {
			title: string;
			genre: string;
			year: string;
		};
		recommendations: Movie[];
	};
}

export interface SearchResponse {
	Search: Movie[];
	totalResults: string;
	Response: string;
}

export interface UpdateFavoriteDTO {
	title?: string;
	personalNotes?: string;
}

export interface MovieDTO {
	movieId: string;
	title: string;
	poster: string;
	year: string;
	personalNotes?: string;
}




