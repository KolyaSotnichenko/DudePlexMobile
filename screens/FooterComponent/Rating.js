import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Icons from "@expo/vector-icons";

const Rating = ({ rating }) => {
  const filledStars = Math.floor(rating / 2);
  const maxStars = Array(5 - filledStars).fill("staro");
  const r = [...Array(filledStars).fill("star"), ...maxStars];
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 4,
        }}
      >
        {r.map((type, index) => {
          return (
            <Icons.AntDesign
              key={index}
              name={type}
              size={14}
              color="#23BAD6"
            />
          );
        })}

        <Text
          style={{
            marginRight: 4,
            fontSize: 14,
            color: "#fff",
            marginLeft: 5,
            fontFamily: "Medium",
          }}
        >
          {filledStars}
        </Text>
      </View>
    </>
  );
};

export default Rating;

const styles = StyleSheet.create({});
