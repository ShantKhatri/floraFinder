import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./src/navigation/bottomTab/BottomTab";
import { FavouritesProvider } from "./src/contexts/FavouritesContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Video } from "expo-av";
import * as SplashScreen from "expo-splash-screen";

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
    // Your existing StoreProfile function
    // ...
  };

  if (!appIsReady) {
    return (
      <View style={styles.container}>
        <Video
          source={require("./assets/splashScreenAnimation.mp4")}
          style={styles.video}
          resizeMode="cover"
          onEnd={() => setAppIsReady(true)}
          shouldPlay
          isLooping={false}
        />
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
