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
import UserProfileScreen from "./src/screens/userProfile/userProfile";
import UserProfileStack from "./src/navigation/stackNavigator/UserProfileStack";
import BottomTab from "./src/navigation/bottomTab/BottomTab";
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
      <BottomTab />
    </NavigationContainer>
  );
};

export default App;
