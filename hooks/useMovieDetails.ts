import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TMDB_CONFIG } from "./useMovies";

export const getMovieDetails = async (movieId?: string) => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`;

  const response = await axios.get<MovieDetails>(endpoint, {
    headers: TMDB_CONFIG.headers,
  });

  if (!response) {
    throw new Error(`Failed to fetch movie details for ${movieId}`);
  }

  return response.data;
};

const useMovieDetails = (movieId?: string) => {
  return useQuery({
    queryKey: ["movie-details", movieId],
    queryFn: () => getMovieDetails(movieId),
    retry: false,
    staleTime: Infinity,
  });
};

export default useMovieDetails;
