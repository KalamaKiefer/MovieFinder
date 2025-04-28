import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";
import useMovieDetails from "@/hooks/useMovieDetails";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants/icons";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-accent font-normal text-md">{label}</Text>
    <Text className="text-secondary font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const {
    data: movieDetails,
    isLoading,
    error,
  } = useMovieDetails(id as string);

  if (isLoading)
    return (
      <SafeAreaView className="bg-darkPrimary flex-1">
        <ActivityIndicator
          size="large"
          color="#283618"
          className="mt-10 self-center"
        />
      </SafeAreaView>
    );

  return (
    <View className="bg-darkPrimary flex-1">
      {error ? (
        <Text className="text-red-500 mx-auto my-auto">
          Error: {error?.message}
        </Text>
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 40,
          }}
        >
          <View>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`,
              }}
              className="w-full h-[550px]"
              resizeMode="stretch"
            />
          </View>

          <View className="flex-col items-start justify-center mt-5 px-5">
            <Text className="text-secondary font-bold text-xl">
              {movieDetails?.title}
            </Text>

            <View className="flex-row items-center gap-x-1 mt-2">
              <Text className="text-accent text-sm">
                {movieDetails?.release_date?.split("-")[0]} •
              </Text>
              <Text className="text-accent text-sm">
                {movieDetails?.runtime}m
              </Text>
            </View>

            <View className="flex-row items-center bg-accent px-2 py-1 rounded-md gap-x-1 mt-2">
              <Image source={icons.star} className="size-4" />

              <Text className="text-secondary font-bold text-sm">
                {Math.round(movieDetails?.vote_average ?? 0)}/10
              </Text>

              <Text className="text-secondary text-sm">
                ({movieDetails?.vote_count} votes)
              </Text>
            </View>

            <MovieInfo label="Overview" value={movieDetails?.overview} />
            <MovieInfo
              label="Genres"
              value={
                movieDetails?.genres?.map((g) => g.name).join(" • ") || "N/A"
              }
            />

            <View className="flex flex-row justify-between w-1/2">
              <MovieInfo
                label="Budget"
                value={`$${(movieDetails?.budget ?? 0) / 1_000_000} million`}
              />
              <MovieInfo
                label="Revenue"
                value={`$${Math.round(
                  (movieDetails?.revenue ?? 0) / 1_000_000
                )} million`}
              />
            </View>

            <MovieInfo
              label="Production Companies"
              value={
                movieDetails?.production_companies
                  ?.map((c) => c.name)
                  .join(" • ") || "N/A"
              }
            />
          </View>

          <TouchableOpacity
            className="mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center mt-10 gap-x-3"
            onPress={router.back}
          >
            <Image
              source={icons.arrow}
              className="size-5 rotate-180"
              tintColor="#fefae0"
            />
            <Text className="text-secondary font-semibold text-base">
              Go Back
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

export default MovieDetails;
