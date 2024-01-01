// App.js

import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import BottomTab from "./src/navigation/bottomTab/BottomTab";
import LoginScreen from "./src/screens/account/login/login";
import { FavouritesProvider } from "./src/contexts/FavouritesContext";
// import { Settings } from "react-native";

const App = () => {
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
