import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "@/services/api";

export const useMovieSearch = () => {
	const [searchQuery, setSearchQuery] = useState("");

	const {
		data: movies = [],
		isLoading,
		error,
		refetch,
		isRefetching,
	} = useQuery({
		queryKey: ["movies", searchQuery],
		queryFn: () => searchMovies(searchQuery).then((data) => data.Search),
		enabled: searchQuery.length > 0,
		staleTime: 1000 * 60 * 5,
	});

	const handleSearch = async (query: string) => {
		setSearchQuery(query);
		if (query.trim()) {
			await refetch();
		}
	};

	return {
		movies,
		isLoading: isLoading || isRefetching,
		error: error instanceof Error ? error.message : null,
		searchQuery,
		setSearchQuery,
		handleSearch,
		retry: refetch,
	};
};
