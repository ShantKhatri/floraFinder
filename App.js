// App.js

import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import BottomTab from "./src/navigation/bottomTab/BottomTab";
import LoginScreen from "./src/screens/account/login/login";
import { FavouritesProvider } from "./src/contexts/FavouritesContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Settings } from "react-native";

const App = () => {
  const StoreProfile = async () => {
    const profilePicture = [
      "profilePicture",
      "https://i.pinimg.com/564x/5e/f1/4e/5ef14efc02c7dd1da2c1d02731b6bf8f.jpg",
    ];
    const userName = ["userName", "User Name"];

    const storedValues = await AsyncStorage.multiGet([
      "profilePicture",
      "userName",
    ]);
    if (storedValues.length == 2) {
      return;
    }
    try {
      await AsyncStorage.multiSet([profilePicture, userName]);
    } catch (error) {
      console.error(error);
    }
  };
  StoreProfile();
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
