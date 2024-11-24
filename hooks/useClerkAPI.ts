import { MovieDTO, UpdateFavoriteDTO } from "@/types/types";
import { useAuth } from "@clerk/clerk-expo";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "https://zareflix-api-clerk.onrender.com/";

function useClerkAPI() {
	const { getToken } = useAuth();

	const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
		const token = await getToken();
		const response = await fetch(`${API_URL}${endpoint}`, {
			...options,
			headers: {
				...options.headers,
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`API error: ${response.status}`);
		}

		return response.json();
	};

	return { fetchWithAuth };
}

export function useFavorites() {
	const { fetchWithAuth } = useClerkAPI();
	const queryClient = useQueryClient();

	const query = useQuery({
		queryKey: ["favorites"],
		queryFn: () => fetchWithAuth("/api/favorites"),
	});

	const addMutation = useMutation({
		mutationFn: (movie: MovieDTO) =>
			fetchWithAuth("/api/favorites", {
				method: "POST",
				body: JSON.stringify(movie),
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["favorites"] });
		},
	});

	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateFavoriteDTO }) =>
			fetchWithAuth(`/api/favorites/${id}`, {
				method: "PUT",
				body: JSON.stringify(data),
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["favorites"] });
		},
	});

	const removeMutation = useMutation({
		mutationFn: (id: string) =>
			fetchWithAuth(`/api/favorites/${id}`, {
				method: "DELETE",
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["favorites"] });
		},
	});

	return {
		favorites: query.data,
		isLoading: query.isLoading,
		error: query.error,
		addFavorite: addMutation.mutate,
		updateFavorite: updateMutation.mutate,
		removeFavorite: removeMutation.mutate,
		isAdding: addMutation.isPending,
		isUpdating: updateMutation.isPending,
		isRemoving: removeMutation.isPending,
		refetch: query.refetch,
	};
}
