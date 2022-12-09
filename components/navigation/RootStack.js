import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../../screens/RootNavigation/SplashScreen";
import SignInScreen from "../../screens/RootNavigation/SignInScreen";
import SignUpScreen from "../../screens/RootNavigation/SignUpScreen";

const Root = createStackNavigator();

const RootStack = () => {
  return (
    <Root.Navigator screenOptions={{ headerShown: false }}>
      <Root.Screen name="SplashScreen" component={SplashScreen} />
      <Root.Screen name="SignInScreen" component={SignInScreen} />
      <Root.Screen name="SignUpScreen" component={SignUpScreen} />
    </Root.Navigator>
  );
};

export default RootStack;
