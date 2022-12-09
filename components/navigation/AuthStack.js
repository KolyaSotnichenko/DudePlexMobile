import React, { useState, useEffect, useMemo, useReducer } from "react";
import { View, Text } from "react-native";
import AppStack from "./AppStack";
import RootStack from "./RootStack";
import { AuthContext } from "../context";
import * as SecureStore from "expo-secure-store";
import LottieView from "lottie-react-native";

const AuthStack = () => {
  const initialLoginState = {
    isLoading: true,
    accessToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIVE_TOKEN":
        return {
          ...prevState,
          accessToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          accessToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          accessToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async (accessToken) => {
        try {
          await SecureStore.setItemAsync("accessToken", accessToken);
        } catch (e) {}
        dispatch({ type: "LOGIN", token: accessToken });
      },
      signOut: async () => {
        try {
          await SecureStore.deleteItemAsync("accessToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
    }),
    []
  );
  useEffect(() => {
    setTimeout(async () => {
      let accessToken = null;
      try {
        accessToken = await SecureStore.getItemAsync("accessToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETRIVE_TOKEN", token: accessToken });
    }, 1350);
  }, []);

  if (loginState.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0F0F0F",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LottieView
          source={require("../../assets/LottieAnimation/loading.json")}
          autoPlay
          loop
        />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      {loginState.accessToken !== null ? <AppStack /> : <RootStack />}
    </AuthContext.Provider>
  );
};

export default AuthStack;
