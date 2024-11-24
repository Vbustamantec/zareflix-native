import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "@/services/api";
import { useDebounce } from "./useDebounce";

export const useMovieSearch = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [page, setPage] = useState(1);
	const debouncedSearchQuery = useDebounce(searchQuery, 500);

	const { data, isLoading, error, refetch, isRefetching } = useQuery({
		queryKey: ["movies", debouncedSearchQuery, page],
		queryFn: () => searchMovies(debouncedSearchQuery, page),
		enabled: debouncedSearchQuery.length > 0,
		staleTime: 1000 * 60 * 5,
	});

	const totalPages = data?.totalResults
		? Math.ceil(Number(data.totalResults) / 10)
		: 0;

	const handleSearch = async (query: string) => {
		setSearchQuery(query);
		setPage(1);
	};

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};

	return {
		movies: data?.Search || [],
		totalResults: data?.totalResults ? Number(data?.totalResults) : 0,
		isLoading: isLoading || isRefetching,
		error: error instanceof Error ? error.message : null,
		searchQuery,
		currentPage: page,
		totalPages,
		setSearchQuery,
		handleSearch,
		handlePageChange,
		retry: refetch,
	};
};
