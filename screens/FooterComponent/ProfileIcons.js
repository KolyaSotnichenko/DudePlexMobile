import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Icons from "@expo/vector-icons";

const ProfileIcons = ({ color, name, icons_name }) => {
  return (
    <View style={styles.icons_row}>
      <Icons.Feather
        name={icons_name}
        size={28}
        color={color}
        style={styles.iconTop}
      />
      <Text style={styles.icons_text}>{name}</Text>
    </View>
  );
};

export default ProfileIcons;

const styles = StyleSheet.create({
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
  iconTop: {
    marginTop: 10,
  },
});
