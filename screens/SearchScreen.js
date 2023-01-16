import React, { useContext, useState } from "react";
// import filter from "lodash.filter";
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
// import LottieView from "lottie-react-native";
import { API_KEY } from "../models/api";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MovieType } from "../components/contextMovieType";

const { width, height } = Dimensions.get("screen");

const SearchScreen = ({navigation}) => {
  const [movies, setMovies] = useState();
  const [movieType, setMovieType] = useContext(MovieType)
  // const [Loading, setLoading] = useState(true);
  // const [query, setQuery] = useState("");
  // const [fullData, setFullData] = useState([]);
  const [provider, setProvider] = useState("movies")
  const [inputSearch, setInputSearch] = useState("")

  const API_URL_MOVIES = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=uk-UA&query=${inputSearch}&page=1&include_adult=false`;
  const API_URL_TVS = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=uk-UA&page=1&query=${inputSearch}&include_adult=false`

  const fetchData = async (text) => {

    if(provider === "movies"){
      return await fetch(API_URL_MOVIES).then(res => res.json())
    }else{
      return await fetch(API_URL_TVS).then(res => res.json())
    }
  };

  const handleSearch = (event) => {
    setInputSearch(event)
    fetchData(inputSearch).then(data => setMovies(data.results))
  };

  // if (Loading === true) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: "center",
  //         alignItems: "center",
  //         backgroundColor: "#0F0F0F",
  //       }}
  //     >
  //       <LottieView
  //         source={require("../assets/LottieAnimation/search.json")}
  //         autoPlay
  //         loop
  //       />
  //     </View>
  //   );
  // }

  const renderSearchRow = ({ item, index }) => {
    
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("MovieScreen", { item, search: true })}>
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
              {provider === "movies" ? item.title : item.name}
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
      </TouchableOpacity>
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
          value={inputSearch}
          onChangeText={(e) => handleSearch(e)}
          placeholderTextColor="#fff"
          iconColor="#fff"
          placeholder={provider === "movies" ? "Знайти фільм" : "Знайти серіал"}
          color="#fff"
        />

        <View style={styles.tabs}>
          <Text style={provider === "movies" ? {fontWeight: 'bold', color: 'royalblue', borderWidth: '1px', borderRadius: 10, paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15, borderColor: 'royalblue'} : {color: '#fff'}} onPress={() => {
            setInputSearch("")
            setMovies(null)
            setProvider("movies")
            setMovieType("movie")
          }}>Фільми</Text>
          <Text style={provider === "tvs" ? {fontWeight: 'bold', color: 'royalblue', borderWidth: '1px', borderRadius: 10, paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15, borderColor: 'royalblue'} : {color: '#fff'}} onPress={() => {
            setInputSearch("")
            setMovies(null)
            setProvider("tvs")
            setMovieType("tv")
          }}>Серіали</Text>
        </View>

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
  tabs: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    alignItems: 'center',
  }
});
