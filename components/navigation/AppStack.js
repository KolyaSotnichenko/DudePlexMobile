import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../../screens/HomeScreen";
import ProfileScreen from "../../screens/ProfileScreen";
// import DiscoverScreen from "../../screens/DiscoverScreen";
import BookmarksScreen from "../../screens/BookmarksScreen";
import SearchScreen from "../../screens/SearchScreen";
import CustomTabBar from "./CustomTabBar";

const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <>
      <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen name="MainHomeScreen" component={MainScreen} />
        <Tab.Screen name="SearchScreen" component={SearchScreen} />
        <Tab.Screen name="BookmarksScreen" component={BookmarksScreen} />
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      </Tab.Navigator>
    </>
  );
};

const HomeStack = createStackNavigator();
const MainScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName={"Home"}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({
  shadow: { elevation: 5 },

  linearGradient: {
    height: 30,
    width: 50,
  },
});
