// App.js

import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreScreen from "./src/screens/exploreScreen";
import HomeScreen from "./src/screens/homeScreen";
import SearchPlantScreen from "./src/screens/searchPlant";
import {
  Foundation,
  MaterialCommunityIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import colors from "./src/variables/colors";
import { StatusBar, Text, View } from "react-native";
// import { Settings } from "react-native";

const Tab = createBottomTabNavigator();

const Settings = () => {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

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
      <Text style={{ fontSize: 32, fontWeight: "bold", color: "#133B31" }}>
        {title}
      </Text>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#272D0E",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: [
            {
              display: "flex",
              backgroundColor: colors.primaryBackground,
            },
            null,
          ],
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Foundation name="trees" size={24} color={colors.primaryButton} />
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
                size={24}
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
                size={24}
                color={colors.primaryButton}
              />
            ),
            header: () => null,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="leaf" size={24} color={colors.primaryButton} />
            ),
            header: () => header("Settings"),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
