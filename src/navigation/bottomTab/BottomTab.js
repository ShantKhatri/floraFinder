// App.js

import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Foundation,
  MaterialCommunityIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import UserProfileStack from "../stackNavigator/UserProfileStack";
import HomeScreen from "../../screens/homeScreen";
import colors from "../../variables/colors";
import { Ionicons } from "@expo/vector-icons";
import SearchPlantStack from "../stackNavigator/SearchPlantStack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ExploreStack from "../stackNavigator/ExploreStack";
import { Audio } from "expo-av";
// import { Settings } from "react-native";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const navigation = useNavigation();
  const [sound, setSound] = useState();
  useEffect(() => {
    const loadSound = async () => {
      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync(
        require("../../../assets/button1.mp3")
      );
      setSound(sound);
    };

    loadSound();

    return () => {
      if (sound) {
        console.log("Unloading Sound");
        sound.unloadAsync();
      }
    };
  }, []);

  const playSound = async () => {
    if (sound) {
      console.log("Playing Sound");
      await sound.replayAsync();
    }
  };
  const header = (title) => {
    return (
      <View
        style={{
          // height: "10%",
          backgroundColor: colors.secondaryBackground,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          // paddingTop: StatusBar.currentHeight,
          elevation: 5,
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            playSound();
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back-sharp" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 32, fontWeight: "bold", color: "#133B31" }}>
          {title}
        </Text>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => {
            playSound();
            navigation.navigate("Search", { screen: "PlantScanner" });
          }}
        >
          <Image
            source={require("../../../assets/lens.png")}
            // width={50}
            // height={50}
            style={{ borderRadius: 10 }}
          />
        </TouchableOpacity>
        <StatusBar backgroundColor={colors.secondaryBackground} />
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
        component={ExploreStack}
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
        component={SearchPlantStack}
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

const styles = StyleSheet.create({
  scanButton: {
    // position: "absolute",
    // width: 50,
    // height: 50,
    // top: 15,
    // right: 0,
    // margin: 16,
    backgroundColor: colors.primaryButton,
    borderRadius: 20,
    padding: 4,
  },
});

export default BottomTab;
