import React from "react";
import { View, StyleSheet } from "react-native";
import { SearchBar } from "@/components/ui/SearchBar";
import { MovieList } from "@/components/movies/MovieList";
import { SearchStateView } from "@/components/movies/SearchStateView";
import { Pagination } from "@/components/ui/Pagination";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import { COLORS, SPACING } from "@/constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SearchScreen() {
	const {
		movies,
		isLoading,
		error,
		searchQuery,
		currentPage,
		totalPages,
		setSearchQuery,
		handleSearch,
		handlePageChange,
		retry,
	} = useMovieSearch();
	const insets = useSafeAreaInsets();

	const renderContent = () => {
		if (!searchQuery.trim()) {
			return <SearchStateView type="empty" />;
		}

		if (error) {
			return (
				<SearchStateView
					type="error"
					onRetry={retry}
					searchQuery={searchQuery}
				/>
			);
		}

		if (!isLoading && movies.length === 0) {
			return <SearchStateView type="noResults" searchQuery={searchQuery} />;
		}

		return (
			<>
				<MovieList
					movies={movies}
					isLoading={isLoading}
					error={error}
					onRetry={retry}
				/>
				{totalPages > 1 && (
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
						isLoading={isLoading}
					/>
				)}
			</>
		);
	};

	return (
		<View style={[styles.container, { paddingTop: insets.top }]}>
			<View style={styles.searchContainer}>
				<SearchBar
					value={searchQuery}
					onChangeText={setSearchQuery}
					onSubmit={() => handleSearch(searchQuery)}
					isLoading={isLoading}
				/>
			</View>
			{renderContent()}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background.light,
	},
	searchContainer: {
		backgroundColor: COLORS.background.light,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.border.light,
		paddingBottom: SPACING.sm,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
	},
});
