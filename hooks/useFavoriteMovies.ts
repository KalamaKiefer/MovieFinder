import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TMDB_CONFIG } from "./useMovies";

const getMovieByTitle = async (title: string) => {
  const response = await axios.get<MovieResults>(
    `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(title)}`,
    {
      headers: TMDB_CONFIG.headers,
    }
  );

  if (!response) {
    throw new Error("Failed to fetch favorite movie: " + title);
  }

  return response.data.results[0];
};

export const useFavoriteMovies = (titles: string[]) => {
  return useQuery({
    queryKey: ["favorite-movies", titles],
    queryFn: async () => {
      const results = await Promise.all(titles.map(getMovieByTitle));
      return results.filter(Boolean);
    },
    enabled: titles.length > 0,
    staleTime: Infinity,
  });
};
