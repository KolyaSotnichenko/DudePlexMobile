import { View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, FlatList, Image } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Rating from "./FooterComponent/Rating"
import firebase from 'firebase'
import { MovieType } from '../components/contextMovieType'

const { width, height } = Dimensions.get("screen");

const BookmarksScreen = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [movieType, setMovieType] = useContext(MovieType)

  useEffect(() => {

    firebase.auth().onAuthStateChanged(user => {
      if(user){
        fetchBookmarkList()
      }else{
        console.log('error')
      }
    })
    
    
  }, [firebase.auth().currentUser?.uid])

  const fetchBookmarkList = () => {
    firebase.firestore().collection('mobile_users').doc(firebase.auth().currentUser?.uid)
      .onSnapshot(doc => {
        if(doc.exists){
          const data = doc.data().bookmarks.slice().reverse()
          setMovies(data)
          console.log('ok')
        }
      })
  }
  

  const renderBookmarkRow = ({ item, index }) => {
    
    return (
      <TouchableOpacity
        onPress={() => {
          setMovieType(item.media_type)
          navigation.navigate("TrailerScreen", { item })}
        }>
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
                  item.backdrop,
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
                maxWidth: width
              }}

              numberOfLines={3}
            >
              {item.trans_title}
            </Text>
            <View
              style={{
                marginLeft: 20,
                alignItems: "flex-start",
              }}
            >
              <Rating rating={item.rating} />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
      <LinearGradient
        colors={["#181818", "#0F0F0F", "#0C0C0C"]}
        style={styles.container}
      >
        {movies.length !== 0 && (
          <SafeAreaView style={styles.container}>
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
                renderItem={renderBookmarkRow}
              />
          </SafeAreaView>
        )}
        {movies.length === 0 && (
          <SafeAreaView style={styles.containerEmpty}>
            <Text
              style={{
                color: "#fff",
                fontFamily: "BoldItalic",
                fontSize: 16,
              }}
            >
              Ваш список порожній 😔
            </Text>
        </SafeAreaView>
        )}
        
      </LinearGradient>
  )
}

export default BookmarksScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 20 : 0
  },
  containerEmpty: {
    flex: 1,
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: 'center'
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
    width: width - 50,
  },
  movie_images: {
    height: 80,
    width: 60,
    margin: 5,
    borderRadius: 10,
    marginTop: 5,
  },
  text: {
    color: '#fff'
  }
})