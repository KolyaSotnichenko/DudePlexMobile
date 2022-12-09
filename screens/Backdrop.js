import React from "react";
import { View, FlatList, Animated, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Backdrop = ({ movies, ITEM_SIZE, scrollx, height, width }) => {
  const BACKDROP_HEIGHT = height * 0.7;

  return (
    <View
      style={{
        position: "absolute",
        width,
        height: BACKDROP_HEIGHT,
      }}
    >
      <FlatList
        data={movies}
        keyExtractor={(item) => item.key + "-backdrop"}
        removeClippedSubviews={false}
        contentContainerStyle={{
          width,
          height: BACKDROP_HEIGHT,
        }}
        renderItem={({ item, index }) => {
          const translateX = scrollx.interpolate({
            inputRange: [
              (index - 2) * ITEM_SIZE,
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
            ],
            outputRange: [0, 1, 0.5],
            extrapolate: "clamp",
          });

          return (
            <>
              <Animated.View
                removeClippedSubviews={false}
                style={{
                  position: "absolute",
                  width,
                  height,
                  overflow: "hidden",
                  opacity: translateX,
                }}
              >
                <Image
                  source={{ uri: item.backdrop }}
                  style={{
                    width,
                    height: BACKDROP_HEIGHT,
                    position: "absolute",
                  }}
                />
              </Animated.View>
            </>
          );
        }}
      />
      <LinearGradient
        colors={["transparent", "#0F0F0F"]}
        style={{
          width,
          height: BACKDROP_HEIGHT,
          position: "absolute",
          bottom: 0,
        }}
      />
    </View>
  );
};

export default Backdrop;

// const styles = StyleSheet.create({
//   light_shadow: {

// });
