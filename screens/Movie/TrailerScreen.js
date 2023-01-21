import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  // TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
// import YoutubePlayer from "react-native-youtube-iframe";
import WebView from "react-native-webview";
import { LinearGradient } from "expo-linear-gradient";
import * as Icons from "@expo/vector-icons";
import Rating from "../FooterComponent/Rating";
import { API_KEY, genres, getYoutubeKey } from "../../models/api";
import { MovieType } from "../../components/contextMovieType";
// import {Hypnosis} from "react-cssfx-loading";

import firebase from "firebase";

const { width, height } = Dimensions.get("screen");

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const TrailerScreen = ({ route }) => {
  // const [youtube, setYoutube] = useState(null);
  const [cast, setCast] = useState([]);
  const [imdbID, setImdbID] = useState()
  const [imdbIDTV, setImdbIDTV] = useState()
  const [movieType, setMovieType] = useContext(MovieType)
  const [isLoaded, setIsLoaded] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  let data = route.params.item;

  let fromSearch = route.params.search;

  // let YoutubeUrl;

  // if(fromSearch === true){
  //   YoutubeUrl = getYoutubeKey(data.id);
  // }else{
  //   YoutubeUrl = data.YoutubeKey;
  // }
  const CastUrl = `https://api.themoviedb.org/3/movie/${data.key | data.id}/credits?api_key=${API_KEY}&language=uk-UA`;
  const externalIDSMovie = `https://api.themoviedb.org/3/movie/${data.key | data.id}/external_ids?api_key=${API_KEY}`
  const externalIDSTV = `https://api.themoviedb.org/3/tv/${data.key | data.id}/external_ids?api_key=${API_KEY}&language=uk-UA`

  let date;

  // if (fromSearch === true) {
  //   if (movieType === "tv") {
  //     date = data.first_air_date.split("-");
  //   }
  //   else {
  //     date = data.release_date.split("-")
  //   }
  // } else {
  //   if (movieType === "tv") {
  //     date = data.releaseDate.split("-");
  //   }

  //   date = data.releaseDate.split("-")
  // }

  console.log(data?.genre_ids || data?.genres[2])

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        if (fromSearch === true) {
          firebase.firestore().collection('mobile_users').doc(firebase.auth().currentUser?.uid)
            .onSnapshot(doc => {
              setIsBookmarked(
                doc.data()?.bookmarks.some(item => item.key === data?.id)
              )
            })
        } else {
          firebase.firestore().collection('mobile_users').doc(firebase.auth().currentUser?.uid)
            .onSnapshot(doc => {
              setIsBookmarked(
                doc.data()?.bookmarks.some(item => item.key === data?.key)
              )
            })
        }
      }else{
        console.log('error trailer screen')
      }
    })

  }, [firebase.auth().currentUser?.uid])

  useEffect(() => {
    fetch(externalIDSMovie)
      .then(data => {
        setImdbID(data.json())
      })
    fetch(externalIDSTV)
      .then(data => {
        setImdbIDTV(data.json())
      })
  }, [])

  useEffect(() => {
    Promise.all([fetch(CastUrl)])
      .then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .then((data) => {
        // setYoutube(data[0].results[0].key);

        setCast(data[0].cast);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    compareIds()
  }, [isLoaded, imdbID?._z?.imdb_id, imdbIDTV?._z?.imdb_id, onRefresh])

  const compareIds = async () => {
    if (movieType === "movie") {
      if (imdbID?._z?.imdb_id) {
        await fetch(`https://videocdn.tv/api/movies?api_token=IISbfTsMm42mRk7dtPxB5zmhEfK3YKau&imdb_id=${imdbID?._z?.imdb_id}`, { headers: { 'Access-Control-Allow-Origin': '*' } })
          .then(response => {
            if (response.ok) {
              return response.json()
            }

            throw response
          })
          .then(data => {
            if (data["data"] != null) {
              setIsLoaded(true)
            }
          })
          .catch(err => {
            console.log(err)
          })

      }
    }

    if (movieType === "tv") {
      if (imdbIDTV?._z?.imdb_id) {
        await fetch(`https://videocdn.tv/api/tv-series?api_token=IISbfTsMm42mRk7dtPxB5zmhEfK3YKau&imdb_id=${imdbIDTV?._z?.imdb_id}`, { headers: { 'Access-Control-Allow-Origin': '*' } })
          .then(response => {
            if (response.ok) {
              return response.json()
            }

            throw response
          })
          .then(data => {
            if (data["data"] != null) {
              setIsLoaded(true)
            }
          })
          .catch(err => {
            console.log(err)
          })

      }
    }
  }

  const bookmarkedHandler = async () => {
    if (fromSearch === true) {
      await firebase.firestore().collection("mobile_users").doc(firebase.auth().currentUser?.uid).update({
        bookmarks: !isBookmarked
          ? firebase.firestore.FieldValue.arrayUnion({
            media_type: movieType,
            key: data?.id,
            title: data?.original_title || data?.original_name,
            poster: data?.poster_path,
            backdrop: data?.backdrop_path,
            rating: data?.vote_average,
            description: data?.overview,
            releaseDate: data?.release_date | data?.first_air_date,
            genres: data?.genre_ids | undefined,
            trans_title: data?.title || data?.name,
          })
          : firebase.firestore.FieldValue.arrayRemove({
            media_type: movieType,
            key: data?.id,
            title: data?.original_title | data?.original_name,
            poster: data?.poster_path,
            backdrop: data?.backdrop_path,
            rating: data?.vote_average,
            description: data?.overview,
            releaseDate: data?.release_date | data?.first_air_date,
            genres: data?.genre_ids | undefined,
            trans_title: data?.title || data?.name,
          })
      })
    } else {
      console.log('ok')
      await firebase.firestore().collection("mobile_users").doc(firebase.auth().currentUser?.uid).update({
        bookmarks: !isBookmarked
          ? firebase.firestore.FieldValue.arrayUnion({
            media_type: movieType,
            key: data?.key,
            title: data?.title,
            poster: data?.poster,
            backdrop: data?.backdrop,
            rating: data?.rating,
            description: data?.description,
            releaseDate: data?.releaseDate,
            genres: data?.genres | undefined,
            trans_title: data?.trans_title,
          })
          : firebase.firestore.FieldValue.arrayRemove({
            media_type: movieType,
            key: data?.key,
            title: data?.title,
            poster: data?.poster,
            backdrop: data?.backdrop,
            rating: data?.rating,
            description: data?.description,
            releaseDate: data?.releaseDate,
            genres: data?.genres | undefined,
            trans_title: data?.trans_title,
          })
      })
    }
  }



  return (
    <LinearGradient
      colors={["#181818", "#0F0F0F", "#0C0C0C"]}
      style={styles.container}
    >
      <ScrollView
        stickyHeaderIndices={[0]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* <YoutubePlayer height={300} videoId={youtube} /> */}

        {movieType === "movie" ?
          isLoaded ? (
            <WebView
              source={{ html: `<body style="margin: 0 !important"><iframe width="100%" height="100%" src="https://3442534688564.svetacdn.in/msNIXXBblTTU?imdb_id=${imdbID?._z?.imdb_id}" frameborder="0" allowfullscreen/></body>` }}
              style={{ width: width, height: height / 3, padding: 0 }}
            />
          ) : (
            <View style={{ width: width, height: height / 3, flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
              <ActivityIndicator />
            </View>
          )
          : isLoaded ? (
            <WebView
              source={{ html: `<body style="margin: 0 !important"><iframe width="100%" height="100%" src="https://3442534688564.svetacdn.in/msNIXXBblTTU?imdb_id=${imdbIDTV?._z?.imdb_id}" frameborder="0" allowfullscreen/></body>` }}
              style={{ width: width, height: height / 3, padding: 0 }}
            />
          ) : (
            <View style={{ width: width, height: height / 3, flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
              <ActivityIndicator />
            </View>
          )}

        {/* <View style={{ marginTop: 30 }}>
          <Icons.Feather
            name="heart"
            size={30}
            color="#fff"
            style={{ alignItems: "flex-start", marginLeft: 10, marginTop: -9 }}
          />
        </View> */}
        <View style={{ marginTop: 60, alignItems: "flex-end" }}>
          <TouchableOpacity
            onPress={bookmarkedHandler}
          >
            {isBookmarked ? (
              <Icons.FontAwesome
                name="bookmark"
                size={30}
                color='#23BAD6'
                style={{
                  justifyContent: "flex-start",
                  marginRight: 10,
                  marginTop: -30,
                }}
              />
            ) : (
              <Icons.FontAwesome
                name="bookmark-o"
                size={30}
                color='#fff'
                style={{
                  justifyContent: "flex-start",
                  marginRight: 10,
                  marginTop: -30,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", marginTop: 5 }}>
          <Text
            style={{
              color: "#fff",
              fontFamily: "BoldPops",
              fontSize: 22,
              textAlign: "center",
            }}
          >
            {data?.trans_title || data?.title || data?.name}
          </Text>
          <Rating rating={fromSearch === true ? data.vote_average : data.rating} />
          <Text style={{ color: "#fff", opacity: 0.7 }}>
            {data?.releaseDate || data?.release_date || data?.first_air_date}
          </Text>
        </View>
        {(data.overview !== undefined || data.description !== undefined) && (
          <View
            style={{
              marginLeft: 10,
              flexWrap: "wrap",
              flex: 1,
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontFamily: "SemiBold",
                fontSize: 18,
                marginTop: 5,
              }}
            >
              Огляд
            </Text>
            <Text
              style={{
                color: "#fff",
                textAlign: "left",
                fontFamily: "Medium",
              }}
            >
              {data.overview || data.description ? data.overview || data.description : null}
            </Text>
          </View>
        )}
        {cast !== undefined && (
          <>
            <Text
              style={{
                color: "#fff",
                fontFamily: "SemiBold",
                textAlign: "left",
                marginLeft: 10,
                marginTop: 10,
                fontSize: 18,
              }}
            >
              Акторський склад
            </Text>

            <View style={{ flexDirection: "row", marginBottom: 20 }}>
              <FlatList
                horizontal
                data={cast}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item, index) => {
                  return (
                    <>
                      <View
                        style={{
                          flexDirection: "column",
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "#fff",
                            width: 100,
                            height: 160,
                            margin: 10,
                            marginRight: 20,
                            borderRadius: 10,
                          }}
                        >
                          <Image
                            style={{
                              flex: 1,
                              height: undefined,
                              width: undefined,
                              borderRadius: 10,
                            }}
                            source={{
                              uri: `https://image.tmdb.org/t/p/w500${item.item.profile_path}`,
                            }}
                          />
                        </View>
                        <Text style={styles.castName}>{item.item.name}</Text>
                      </View>
                    </>
                  );
                }}
              />
            </View>
          </>
        )}
        {/* <View style={{ marginTop: 15 }}>
          <Text
            style={{
              fontFamily: "Medium",
              color: "#fff",
              opacity: 0.7,
              marginLeft: 10,
              marginBottom: -5,
              fontSize: 18,
            }}
          >
            Price
          </Text>
          <View
            style={{
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontFamily: "SemiBold",
                fontSize: 20,
                marginLeft: 10,
              }}
            >
              ₹150
            </Text>
          </View>
          <View style={{ alignItems: "flex-end", justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={{
                marginTop: -50,
              }}
            >
              <LinearGradient
                colors={["#71C9B1", "#4DC2C2", "#23BAD6"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{
                  width: BUTTON_WIDTH,
                  height: 50,
                  borderTopLeftRadius: 20,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontFamily: "SemiBold",
                    fontSize: 20,
                  }}
                >
                  Buy
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View> */}
      </ScrollView>
    </LinearGradient>
  );
};

export default TrailerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  castName: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,

    fontFamily: "Medium",
  },
});
