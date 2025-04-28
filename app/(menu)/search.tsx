import { View, Text, Image, ActivityIndicator, FlatList } from "react-native";
import { useDebounce } from "use-debounce";
import React from "react";
import useMovies from "@/hooks/useMovies";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [debouncedSearch] = useDebounce(searchQuery, 500);

  const { data: movies, isLoading, error } = useMovies(debouncedSearch);

  return (
    <View className="flex-1 relative bg-offWhite">
      <Image
        source={images.bg}
        className="absolute inset-0 w-full h-full opacity-10 z-0"
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          marginVertical: 16,
          paddingRight: 5,
          marginBottom: 10,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        className="px-5"
        ListHeaderComponent={
          <>
            <View className="mt-20 mb-5">
              <SearchBar
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />
            </View>

            {isLoading && (
              <ActivityIndicator
                size="large"
                color="#283618"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}

            {!isLoading &&
              !error &&
              searchQuery.trim() &&
              movies &&
              movies?.length > 0 && (
                <Text className="text-xl text-primary font-bold">
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !isLoading && !error ? (
            <View className="mt-10">
              <Text className="text-center text-primary font-semibold text-3xl">
                {searchQuery.trim() ? "No Movies Found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
