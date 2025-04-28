import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

export interface SearchBarProps {
  value?: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({
  value = "",
  onPress = () => {},
  onChangeText = () => {},
}: SearchBarProps) => {
  return (
    <View className="flex-row items-center rounded-full px-5 py-4 mt-2 bg-secondary border-primary border">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#606c38"
      />
      <TextInput
        onPress={onPress}
        onChangeText={onChangeText}
        placeholder="Search Movies:"
        value={value}
        placeholderTextColor={"#606c38"}
        className="flex-1 ml-2 text-primary"
      />
    </View>
  );
};

export default SearchBar;
