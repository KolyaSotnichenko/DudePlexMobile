import React, { useEffect, useState } from "react";
import filter from "lodash.filter";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Searchbar } from "react-native-paper";

import Rating from "./FooterComponent/Rating";
import LottieView from "lottie-react-native";
import { API_KEY } from "../models/api";

const { width, height } = Dimensions.get("screen");
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;

const SearchScreen = () => {
  const [movies, setMovies] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [fullData, setFullData] = useState([]);

  useEffect(() => {
    if (movies.length === 0) {
      fetchData();
    }
  }, [movies]);
  const fetchData = async () => {
    const { results } = await fetch(API_URL).then((response) =>
      response.json()
    );
    setMovies(results);
    setFullData(results);
    setLoading(false);
  };

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(fullData, (movie_title) => {
      return contains(movie_title, formattedQuery);
    });
    setMovies(filteredData);
    setQuery(text);
  };
  const contains = ({ original_title, movie_poster }, query) => {
    original_title = original_title.toLowerCase();
    if (original_title.includes(query)) {
      return true;
    }
    return false;
  };
  if (Loading === true) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0F0F0F",
        }}
      >
        <LottieView
          source={require("../assets/LottieAnimation/search.json")}
          autoPlay
          loop
        />
      </View>
    );
  }

  const renderSearchRow = ({ item, index }) => {
    return (
      <>
        <LinearGradient
          colors={["#373636", "#1C1B1A", "#1C1B1A"]}
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 0.5, y: 1.0 }}
          style={styles.movie_cards}
        >
          <View style={{ marginLeft: 0 }}>
            <Image
              source={{
                uri:
                  "https://image.tmdb.org/t/p/w370_and_h556_multi_faces" +
                  item.backdrop_path,
              }}
              style={styles.movie_images}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 14,
                marginTop: 5,
                marginLeft: 22,
                fontFamily: "Medium",
                maxWidth: 300
              }}

              numberOfLines={3}
            >
              {item.original_title}
            </Text>
            <View
              style={{
                marginLeft: 20,
                alignItems: "flex-start",
              }}
            >
              <Rating rating={item.vote_average} />
            </View>
            <Text style={styles.description} numberOfLines={2}>
              {item.overview}
            </Text>
          </View>
        </LinearGradient>
      </>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#181818", "#0F0F0F", "#0C0C0C"]}
        style={styles.container}
      >
        <Searchbar
          style={styles.searchbar}
          value={query}
          onChangeText={(queryText) => handleSearch(queryText)}
          placeholderTextColor="#fff"
          iconColor="#fff"
          placeholder="Search movies..."
          color="#fff"
        />

        <FlatList
          data={movies}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={() => {
            return (
              <View
                style={{
                  marginBottom: 50,
                }}
              />
            );
          }}
          renderItem={renderSearchRow}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    alignItems: "center",
    backgroundColor: '#1C1B1A'
  },

  searchbar: {
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 40,
    height: 40,
    width: 330,
    backgroundColor: "#1C1B1A",
  },
  movie_cards: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: 'center',
    // marginLeft: 10,
    // marginRight: 82,
    elevation: 5,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  movie_images: {
    height: 80,
    width: 60,
    margin: 5,
    borderRadius: 10,
    marginTop: 5,
  },
  description: {
    width: 220,
    fontSize: 10,
    color: "#fff",
    alignItems: "center",
    marginLeft: 25,
    opacity: 0.7,
    marginBottom: 5,
  },
});
