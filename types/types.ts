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

export interface SentimentAnalysis {
	sentiment: "positive" | "negative" | "neutral";
	score: number;
}

export interface FavoriteMovie {
	_id: string;
	userId: string;
	movieId: string;
	title: string;
	poster: string;
	year: string;
	personalNotes?: string;
	sentiment?: SentimentAnalysis;
	createdAt: string;
	updatedAt: string;
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

export interface MovieListProps {
	movies: Movie[];
	isLoading: boolean;
	error: string | null;
	onRetry?: () => void;
}

export interface SearchStateViewProps {
	type: "empty" | "noResults" | "error";
	searchQuery?: string;
	onRetry?: () => void;
}

export interface SearchBarProps {
	value: string;
	onChangeText: (text: string) => void;
	onSubmit: () => void;
	isLoading?: boolean;
	placeholder?: string;
	onClear?: () => void;
	autoFocus?: boolean;
	disabled?: boolean;
  }