import { View, Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const { width, height } = Dimensions.get("screen");

const BookmarksScreen = () => {
  return (
      <LinearGradient
        colors={["#181818", "#0F0F0F", "#0C0C0C"]}
        style={styles.container}
      >
        <SafeAreaView style={styles.container}>
          <Text style={styles.text}>Буде доступно в наступному оновленні!</Text>
        </SafeAreaView>
      </LinearGradient>
  )
}

export default BookmarksScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: width,
    height: height,
    alignItems: 'center',
  },
  text: {
    color: '#fff'
  }
})