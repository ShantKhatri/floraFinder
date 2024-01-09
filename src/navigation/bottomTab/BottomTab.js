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
import { useNavigation } from "@react-navigation/native";
import ExploreStack from "../stackNavigator/ExploreStack";
import { Audio } from "expo-av";

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
  const header = (title, routeScreen) => {
    return (
      <View
        style={{
          backgroundColor: colors.secondaryBackground,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          elevation: 5,
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            playSound();
            navigation.navigate(routeScreen);
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
            navigation.navigate("SearchStack", { screen: "PlantScanner" });
          }}
        >
          <Image
            source={require("../../../assets/lens.png")}
            style={{ borderRadius: 10 }}
          />
        </TouchableOpacity>
        <StatusBar backgroundColor={colors.secondaryBackground} />
      </View>
    );
  };
  return (
    <Tab.Navigator
      initialRouteName="SearchStack"
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
        name="HomeStack"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Foundation name="trees" size={36} color={colors.primaryButton} />
          ),
          header: () => header("Plant of the Day", "HomeStack"),
        }}
      />
      <Tab.Screen
        name="ExploreStack"
        component={ExploreStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="flower-tulip"
              size={36}
              color={colors.primaryButton}
            />
          ),
          header: () => header("Explore", "Explore"),
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchPlantStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome
              name="wpexplorer"
              size={36}
              color={colors.primaryButton}
            />
          ),
          header: () => {
            return (
              <View>
                <StatusBar backgroundColor={colors.secondaryBackground} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={UserProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="leaf" size={36} color={colors.primaryButton} />
          ),
          header: () => header("Profile", "UserProfileScreen"),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  scanButton: {
    backgroundColor: colors.primaryButton,
    borderRadius: 20,
    padding: 4,
  },
});

export default BottomTab;
