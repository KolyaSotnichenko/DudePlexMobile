import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import TabIcons from "./TabIcons";

const { width, height } = Dimensions.get("screen");

const CustomTabBar = ({ state, navigation }) => {
  let icons_name = ["film", "search", "tv", "user"];
  const color_tab = ["#181822", "#1a1a24", "#202124", "#202124"];

  return (
    <View
      style={styles.container}
    >
      <View style={styles.tabs}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          return (
            <TabIcons
              isFocused={isFocused}
              route_name={route.name}
              icon={icons_name[index]}
              navigation={navigation}
              key={index}
              color_tab={color_tab[index]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: 80,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#0f0f0f'
  },
  tabs: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 38,
    width: width,
  },
});
