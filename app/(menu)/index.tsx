import FavoriteCard from "@/components/FavoriteCard";
import MovieCard from "@/components/MovieCard";
import { images } from "@/constants/images";
import { useFavoriteMovies } from "@/hooks/useFavoriteMovies";
import useMovies from "@/hooks/useMovies";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const { data: movies, isLoading, error } = useMovies();

  const recentFavorites = [
    "Ricky Stanicky",
    "Lyle, Lyle, Crocodile",
    "Monty Python and The Holy Grail",
    "Bowfinger",
    "Parasite",
  ];

  const {
    data: kalamasFavorites,
    isLoading: isLoadingFavs,
    error: favsError,
  } = useFavoriteMovies(recentFavorites);

  return (
    <View className="flex-1 relative bg-offWhite">
      <Image
        source={images.bg}
        className="absolute inset-0 w-full h-full opacity-10 z-0"
      />

      {isLoading || isLoadingFavs ? (
        <ActivityIndicator
          size="large"
          color="#283618"
          className="mt-10 self-center"
        />
      ) : error || favsError ? (
        <Text className="text-red-500 mx-auto my-3">
          Error: {error?.message || favsError?.message}
        </Text>
      ) : (
        <View className="flex-1 mt-5">
          <FlatList
            data={movies}
            renderItem={({ item }) => <MovieCard {...item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
              paddingRight: 5,
              marginBottom: 10,
            }}
            ListHeaderComponent={
              <View>
                <Text className="text-5xl text-primary font-semibold mx-auto">
                  Movie Finder
                </Text>

                {kalamasFavorites && (
                  <View className="mt-10">
                    <Text className="text-lg text-primary font-bold mb-3">
                      Kalama's Recent Favorite's
                    </Text>
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      className="-mr-5"
                      data={kalamasFavorites}
                      contentContainerStyle={{
                        gap: 26,
                      }}
                      renderItem={({ item, index }) => (
                        <FavoriteCard index={index} {...item} />
                      )}
                      keyExtractor={(item) => item.id.toString()}
                      ItemSeparatorComponent={() => <View className="w-4" />}
                    />
                  </View>
                )}

                <Text className="text-lg text-primary font-bold mb-3 mt-10">
                  Latest Movies
                </Text>
              </View>
            }
            className="px-5 pt-20 pb-32"
          />
        </View>
      )}
    </View>
  );
}
