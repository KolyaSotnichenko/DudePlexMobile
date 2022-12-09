import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";
import * as Icons from "@expo/vector-icons";

const TabIcons = ({
  isFocused,
  route_name,
  icon,
  navigation,
  index,
  color_tab,
}) => {
  const animatedValueHome = useRef(new Animated.Value(0)).current;

  const translateY = animatedValueHome.interpolate({
    inputRange: [50, 100, 150],
    outputRange: [25, 50, 75],
  });

  useEffect(() => {
    if (isFocused === true) {
      Animated.timing(animatedValueHome, {
        toValue: -25,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValueHome, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  });
  const animationHome = (name) => {
    navigation.navigate(name);
  };

  return (
    <>
      <Animated.View
        key={index}
        style={{
          flex: 1,
          flexDirection: "row",
          transform: [{ translateY }],
        }}
      >
        <Icons.Feather
          name={icon}
          color={isFocused ? "#23BAD6" : "#fff"}
          size={24}
          onPress={() => animationHome(route_name)}
        />
        {isFocused ? (
          <Animated.View
            style={[styles.dot, { backgroundColor: "#23BAD6" }]}
          ></Animated.View>
        ) : (
          <Animated.View
            style={[styles.dot, { backgroundColor: `${color_tab}` }]}
          ></Animated.View>
        )}
      </Animated.View>
    </>
  );
};

export default TabIcons;

const styles = StyleSheet.create({
  dot: {
    width: 4,
    height: 4,
    borderRadius: 7,
    // marginTop: 5,
    marginTop: 30,
    marginLeft: -15,
  },
});
