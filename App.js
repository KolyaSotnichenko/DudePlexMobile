import React, { useState } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./components/navigation/AuthStack";
import { useFonts } from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import TrailerScreen from "./screens/Movie/TrailerScreen";
import firebase from "firebase";
import { MovieType } from "./components/contextMovieType";

function App() {

  const [movieType, setMovieType] = useState("")

  const firebaseConfig = {
    apiKey: "AIzaSyB8J4EwGntAiu1ntW8cOqV_5MvSi1ylizo",
    authDomain: "dudeplex-d3943.firebaseapp.com",
    projectId: "dudeplex-d3943",
    storageBucket: "dudeplex-d3943.appspot.com",
    messagingSenderId: "14565264809",
    appId: "1:14565264809:web:57b224fa449bcdd848c8b8"
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
        <StatusBar barStyle={"light-content"} />
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
