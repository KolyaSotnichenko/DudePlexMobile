import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  SafeAreaView,
} from "react-native";

import { getMovies } from "../models/api";
import Rating from "./FooterComponent/Rating";
import Backdrop from "./Backdrop";
import Genres from "./FooterComponent/Genres";

const { width, height } = Dimensions.get("window");
const SPACING = 10;
const ITEM_SIZE = width * 0.72;

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const scrollx = useRef(new Animated.Value(0)).current;
  const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;
  const load = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      if (load.current === true) {
        setMovies([{ key: "left-spacer" }, ...movies, { key: "right-spacer" }]);
      }
    };

    if (movies.length === 0) {
      fetchData(movies);
    }
    return () => {
      load.current = false;
    };
  }, [movies]);

  const renderRow = ({ item, index }) => {
    if (!item.poster) {
      return (
        <View style={{ width: SPACER_ITEM_SIZE }} backgroundColor="white" />
      );
    }

    const inputRange = [
      (index - 2) * ITEM_SIZE,
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
    ];

    const translateY = scrollx.interpolate({
      inputRange,
      outputRange: [0, -50, 0],
      extrapolate: "clamp",
    });

    return (
      <View style={{ width: ITEM_SIZE }}>
        <Animated.View
          style={{
            marginTop: SPACING * 20,
            marginHorizontal: SPACING,
            padding: SPACING * 2,
            transform: [{ translateY }],
            alignItems: "center",
            borderRadius: 34,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("TrailerScreen", { item: item })}
            style={[styles.posterImage, { elevation: 2 }]}
          >
            <Image source={{ uri: item.poster }} style={styles.posterImage} />
          </TouchableOpacity>
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontFamily: "Medium",
            }}
          >
            {item.title}
          </Text>

          <Rating rating={item.rating} />
          <Genres genres={item.genres} />
        </Animated.View>
      </View>
    );
  };
  const keyExtractor = (item) => item.key;

  return (
    <SafeAreaView style={styles.container}>
      <Backdrop
        movies={movies}
        height={height}
        width={width}
        ITEM_SIZE={ITEM_SIZE}
        scrollx={scrollx}
      />

      <Animated.FlatList
        data={movies}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
        }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        decelerationRate={0}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollx } } }],
          { useNativeDriver: true }
        )}
        renderItem={renderRow}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
  },
  posterImage: {
    width: "100%",
    height: ITEM_SIZE * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    marginBottom: 10,
  },
});
