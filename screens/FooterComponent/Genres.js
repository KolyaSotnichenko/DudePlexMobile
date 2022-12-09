import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Genres = ({ genres }) => {
  return (
    <View style={styles.genres}>
      {genres.map((genre, i) => {
        if(genre !== undefined){
          return (
            <View key={genre} style={styles.genre}>
              <Text key={genre} style={styles.genreText}>{genre}</Text>
            </View>
          );
        }
      })}
    </View>
  );
};

export default Genres;

const styles = StyleSheet.create({
  genres: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 4,
  },
  genre: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: "#ccc",
    marginRight: 4,
    marginBottom: 4,
  },
  genreText: {
    fontSize: 9,
    opacity: 0.4,
    color: "#fff",
  },
});
