import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Icons from "@expo/vector-icons";
import ProgressBar from "./ProgressBar";
import ProfileIcons from "./FooterComponent/ProfileIcons";
import { AuthContext } from "../components/context";

const { width, height } = Dimensions.get("screen");

const CARD_WIDTH = width * 0.85;
const CARD_HEIGHT = height / 4;

const ProfileScreen = () => {
  const { signOut } = useContext(AuthContext);

  const image_url =
    "https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80";
  return (
    <LinearGradient
      colors={["#181818", "#0F0F0F", "#0C0C0C"]}
      style={styles.container}
    >
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Image
          source={require("../assets/images/unsplashMan.png")}
          style={styles.img_style}
        />
        {/* <Text
          style={{
            marginTop: 130,
            color: "#fff",
            fontFamily: "BoldItalic",
            fontSize: 16,
          }}
        >
          Jack Sparrow
        </Text> */}
      </View>

      <View style={{ marginTop: 25, flexDirection: "row" }}>
        <View
          style={{
            flexDirection: "column",
            marginLeft: 50,
            marginRight: 80,
            alignItems: "center",
          }}
        >
          <Text style={styles.headerText}>Watch(hrs)</Text>
          <ProgressBar data={8.8} tintColor={"#00e0ff"} />
        </View>
        <View
          style={{
            marginLeft: 0,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text style={styles.headerText}>Streak</Text>
          <ProgressBar data={5.3} tintColor={"#00ffb9"} />
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <LinearGradient
          colors={["#373636", "#373636", "#1C1B1A"]}
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 0.5, y: 1.0 }}
          style={styles.card}
        >
          <View style={{ flexDirection: "row" }}>
            <ProfileIcons name="Liked" icons_name="heart" color="#00e0ff" />

            <View style={styles.icons_row}>
              <Icons.Feather
                name="bell"
                size={28}
                color="#00ffb9"
                style={styles.iconTop}
              />
              <Text
                style={{
                  fontFamily: "Medium",
                  color: "#fff",
                  fontSize: 13,
                  marginTop: 6,
                }}
              >
                Notifications
              </Text>
            </View>

            <ProfileIcons
              name="Downloads"
              icons_name="download-cloud"
              color="#fff"
            />
          </View>
          <View
            style={{
              marginTop: 20,
              borderBottomColor: "white",
              borderBottomWidth: 1,
            }}
          ></View>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <View style={styles.icons_row}>
              <Icons.Feather
                name="share-2"
                size={30}
                color="#00ffb9"
                style={styles.iconTop}
              />
              <Text style={[styles.icons_text, { marginTop: 5 }]}>Share</Text>
            </View>
            <ProfileIcons name="Settings" color="#fff" icons_name="settings" />
            <ProfileIcons
              name="About Us"
              icons_name="help-circle"
              color="#00e0ff"
            />
          </View>
        </LinearGradient>
      </View>
      <View
        style={{
          marginTop: 57,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => signOut()}>
          <LinearGradient
            colors={["#71C9B1", "#4DC2C2", "#23BAD6"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.signOut}
          >
            <Text
              style={{
                fontFamily: "Medium",
                color: "#fff",
                fontSize: 16,
                marginRight: 10,
              }}
            >
              Вихід
            </Text>
            <Icons.Feather name="log-out" color="#fff" size={24} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
  },
  img_style: {
    // position: "absolute",
    height: 120,
    width: 100,
    borderRadius: 15,
    marginTop: 50,
  },
  headerText: {
    fontSize: 17,
    color: "#fff",
    fontFamily: "Medium",
  },
  icons_text: {
    marginTop: 7,
    color: "#fff",
    fontSize: 13,
    fontFamily: "Medium",
  },
  icons_row: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    display: "flex",
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderRadius: 20,
    marginTop: 25,
    opacity: 0.8,
  },
  iconTop: {
    marginTop: 10,
  },
  signOut: {
    flexDirection: "row",
    height: 40,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -15,
    borderRadius: 50,
  },
});
