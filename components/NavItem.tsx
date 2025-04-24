import { View, Text, Image } from "react-native";
import clsx from "clsx";

import React from "react";

export interface NavItemProps {
  image: any;
  title: string;
  focused: boolean;
}

const NavItem = ({ image, title, focused }: NavItemProps) => {
  return (
    <View
      className={clsx(
        "flex-row items-center justify-center w-full h-full min-w-[140px] min-h-16 mt-3",
        focused ? "bg-secondary rounded-full" : ""
      )}
    >
      <Image
        style={{ tintColor: focused ? "#283618" : "#fefae0" }}
        source={image}
        className="size-5"
      />
      <Text
        className={clsx(
          "text-base font-semibold ml-2",
          focused ? "text-darkPrimary" : "text-secondary"
        )}
      >
        {title}
      </Text>
    </View>
  );
};

export default NavItem;
