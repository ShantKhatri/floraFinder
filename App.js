import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./src/navigation/bottomTab/BottomTab";
import { FavouritesProvider } from "./src/contexts/FavouritesContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ResizeMode, Video } from "expo-av";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

SplashScreen.hideAsync();
const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await StoreProfile();
        await playVideo(); // Function to play the video
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
      }
    };
    prepare();
  }, []);

  const playVideo = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 4000); // Adjust this duration to match your video length
    });
  };

  const StoreProfile = async () => {
    const profilePictureKey = "profilePicture";
    const userNameKey = "userName";

    const storedProfilePicture = await AsyncStorage.getItem(profilePictureKey);
    const storedUserName = await AsyncStorage.getItem(userNameKey);

    if (storedProfilePicture !== null && storedUserName !== null) {
      console.log("Values already stored");
      return;
    }

    const defaultProfilePicture =
      "https://i.pinimg.com/564x/5e/f1/4e/5ef14efc02c7dd1da2c1d02731b6bf8f.jpg";
    const defaultUserName = "User Name";

    try {
      if (storedProfilePicture === null) {
        await AsyncStorage.setItem(profilePictureKey, defaultProfilePicture);
      }

      if (storedUserName === null) {
        await AsyncStorage.setItem(userNameKey, defaultUserName);
      }

      console.log("Default values stored");
    } catch (error) {
      console.error(error);
    }
  };

  if (!appIsReady) {
    return (
      <View style={styles.container}>
        <Video
          source={require("./assets/splashScreenAnimation.mp4")}
          style={styles.video}
          resizeMode={ResizeMode.STRETCH}
          onEnd={() => setAppIsReady(true)}
          shouldPlay
          isLooping={false}
        />
        <StatusBar translucent />
      </View>
    );
  }

  return (
    <FavouritesProvider>
      <NavigationContainer>
        <BottomTab />
      </NavigationContainer>
    </FavouritesProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default App;
