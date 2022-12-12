import React from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet, SafeAreaView } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

const SplashScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#181818", "#0F0F0F", "#0C0C0C"]}
      style={styles.container}
    >
      <SafeAreaView
        style={{flexDirection: 'row', alignItems: 'center',}}
      >
        {/* <Image
          style={{ height: 250, marginTop: 0, width: 300, marginLeft: -100 }}
          resizeMode="center"
          source={require("../../assets/logo.png")}
        /> */}
        <Text
          style={{color: 'white', fontWeight: '700', fontSize: 30}}
        >
          DUDEPLEX
        </Text>
      </SafeAreaView>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 300, height: 300 }}
          source={require("../../assets/images/splash-removebg-preview.png")}
        />
      </View>
      <Text style={{ color: "#fff", fontFamily: "SemiBold" }}>
      Дивіться улюблені фільми та серіали безкоштовно
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
        <LinearGradient
          colors={["#71C9B1", "#4DC2C2", "#23BAD6"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.buttonGradient}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: "SemiBold",
              fontSize: 16,
            }}
          >
            Розпочати
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'center', 
    alignItems: "center",
  },
  buttonGradient: {
    borderRadius: 50,
    height: 35,
    width: 200,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
