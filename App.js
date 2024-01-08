// App.js

import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import BottomTab from "./src/navigation/bottomTab/BottomTab";
import LoginScreen from "./src/screens/account/login/login";
import { FavouritesProvider } from "./src/contexts/FavouritesContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        StoreProfile();
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    };
    prepare();
  });
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

  return (
    <FavouritesProvider>
      <NavigationContainer>
        <BottomTab />
      </NavigationContainer>
    </FavouritesProvider>
    // <LoginScreen />
  );
};

export default App;
