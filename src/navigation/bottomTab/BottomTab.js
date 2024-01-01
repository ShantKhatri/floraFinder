// App.js

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Foundation,
  MaterialCommunityIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import UserProfileStack from "../stackNavigator/UserProfileStack";
import HomeScreen from "../../screens/homeScreen";
import ExploreScreen from "../../screens/exploreScreen";
import SearchPlantScreen from "../../screens/searchPlant";
import colors from "../../variables/colors";
import { Ionicons } from "@expo/vector-icons";
// import { Settings } from "react-native";

const Tab = createBottomTabNavigator();

const BottomTab = (navigation) => {
  const header = (title) => {
    return (
      <View
        style={{
          // height: "10%",
          backgroundColor: colors.secondaryBackground,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: StatusBar.currentHeight,
          elevation: 5,
        }}
      >
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" size={24} color="black" />
        </TouchableOpacity> */}
        <Text style={{ fontSize: 32, fontWeight: "bold", color: "#133B31" }}>
          {title}
        </Text>
      </View>
    );
  };
  return (
    <Tab.Navigator
      initialRouteName="Search"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#272D0E",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: [
          {
            display: "flex",
            backgroundColor: colors.secondaryBackground,
          },
          null,
        ],
        tabBarActiveBackgroundColor: colors.primaryBackground,
        tabBarVisibilityAnimationConfig: {
          delay: 500,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Foundation name="trees" size={36} color={colors.primaryButton} />
          ),
          header: () => header("Plant of the Day"),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="flower-tulip"
              size={36}
              color={colors.primaryButton}
            />
          ),
          header: () => header("Explore"),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchPlantScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome
              name="wpexplorer"
              size={36}
              color={colors.primaryButton}
            />
          ),
          header: () => null,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={UserProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="leaf" size={36} color={colors.primaryButton} />
          ),
          header: () => header("Profile"),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
