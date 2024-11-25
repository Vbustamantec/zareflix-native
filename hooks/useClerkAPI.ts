import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-expo";
import { MovieDTO, UpdateFavoriteDTO } from "@/types/types";

export function useFavorites() {
	const { user } = useUser();
	const queryClient = useQueryClient();

	const getFavorites = async () => {
		if (!user?.id) {
			throw new Error("No user ID found");
		}

		const response = await fetch(
			`https://zareflix-api-clerk.onrender.com/api/favorites`,
			{
				headers: {
					"X-User-Id": user.id,
				},
			}
		);

		if (!response.ok) {
			throw new Error("Error fetching favorites");
		}

		const data = await response.json();
		return data.data;
	};

	const query = useQuery({
		queryKey: ["favorites", user?.id],
		queryFn: getFavorites,
		enabled: !!user,
	});

	const addFavorite = useMutation({
		mutationFn: async (movie: MovieDTO) => {
			const response = await fetch(
				"https://zareflix-api-clerk.onrender.com/api/favorites",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"X-User-Id": user?.id || "",
					},
					body: JSON.stringify(movie),
				}
			);

			if (!response.ok) {
				throw new Error("Error adding favorite");
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["favorites", user?.id] });
		},
	});

	const updateFavorite = useMutation({
		mutationFn: async ({
			id,
			data,
		}: {
			id: string;
			data: UpdateFavoriteDTO;
		}) => {
			const response = await fetch(
				`https://zareflix-api-clerk.onrender.com/api/favorites/${id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"X-User-Id": user?.id || "",
					},
					body: JSON.stringify(data),
				}
			);

			if (!response.ok) {
				throw new Error("Error updating favorite");
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["favorites", user?.id] });
		},
	});

	const removeFavorite = useMutation({
		mutationFn: async (id: string) => {
			const response = await fetch(
				`https://zareflix-api-clerk.onrender.com/api/favorites/${id}`,
				{
					method: "DELETE",
					headers: {
						"X-User-Id": user?.id || "",
					},
				}
			);

			if (!response.ok) {
				throw new Error("Error removing favorite");
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["favorites", user?.id] });
		},
	});

	return {
		favorites: query.data || [],
		isLoading: query.isLoading,
		error: query.error,
		addFavorite: addFavorite.mutate,
		updateFavorite: updateFavorite.mutate,
		removeFavorite: removeFavorite.mutate,
		isAdding: addFavorite.isPending,
		isUpdating: updateFavorite.isPending,
		isRemoving: removeFavorite.isPending,
		refetch: query.refetch,
	};
}
