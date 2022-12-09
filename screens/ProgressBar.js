import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const ProgressBar = ({ data, tintColor }) => {
  return (
    <View style={{ marginTop: 10 }}>
      <AnimatedCircularProgress
        size={70}
        width={5}
        fill={data * 10}
        tintColor={tintColor}
        rotation={0}
        lineCap="round"
        backgroundColor="#3d5875"
      >
        {(fill) => (
          <Text style={{ color: "white", fontFamily: "Medium" }}>
            {data}/10
          </Text>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({});
