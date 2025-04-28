import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const getMovieData = async (query?: string) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await axios.get<MovieResults>(endpoint, {
    headers: TMDB_CONFIG.headers,
  });

  if (!response) {
    throw new Error("Failed to fetch movies");
  }

  return response.data.results;
};

const useMovies = (query?: string) => {
  return useQuery({
    queryKey: ["movies", query],
    queryFn: () => getMovieData(query),
    retry: false,
    staleTime: Infinity,
  });
};

export default useMovies;
