import React from "react";
import { Tabs } from "expo-router";
import NavItem from "@/components/NavItem";
import { icons } from "@/constants/icons";

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#606c38",
          borderRadius: 50,
          marginHorizontal: 80,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#283618",
        },
        tabBarItemStyle: {
          width: "auto",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "index",
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <NavItem image={icons.home} focused={focused} title="Home" />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <NavItem image={icons.search} focused={focused} title="Search" />
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
