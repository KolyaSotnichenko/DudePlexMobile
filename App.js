import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./components/navigation/AuthStack";
import { useFonts } from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import TrailerScreen from "./screens/Movie/TrailerScreen";
import firebase from "firebase";
import { MovieType } from "./components/contextMovieType";

function App() {

  const [movieType, setMovieType] = useState("movie")

  const firebaseConfig = {
    apiKey: "AIzaSyB8J4EwGntAiu1ntW8cOqV_5MvSi1ylizo",
    authDomain: "dudeplex-d3943.firebaseapp.com",
    projectId: "dudeplex-d3943",
    storageBucket: "dudeplex-d3943.appspot.com",
    messagingSenderId: "14565264809",
    appId: "1:14565264809:web:57b224fa449bcdd848c8b8",
    databaseURL: "https://dudeplex-d3943-default-rtdb.europe-west1.firebasedatabase.app"
  };
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  let [fontsLoaded] = useFonts({
    Medium: require("./assets/Fonts/Poppins-Medium.ttf"),
    BoldPops: require("./assets/Fonts/Poppins-Bold.ttf"),
    BoldItalic: require("./assets/Fonts/Poppins-BoldItalic.ttf"),
    NetflixFont: require("./assets/Fonts/BebasNeue.otf"),
    SemiBold: require("./assets/Fonts/Poppins-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  const TrailerScreenStack = createStackNavigator();


  return (
    <>
      <MovieType.Provider value={[movieType, setMovieType]}>
        <StatusBar style="light" />
        <NavigationContainer>
          <TrailerScreenStack.Navigator screenOptions={{ headerShown: false }}>
            <TrailerScreenStack.Screen name="AuthStack" component={AuthStack} />
            <TrailerScreenStack.Screen
              name="TrailerScreen"
              component={TrailerScreen}
            />
          </TrailerScreenStack.Navigator>
        </NavigationContainer>
      </MovieType.Provider>
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: "#232323",
    alignItems: "center",
    justifyContent: "center",
  },
});
