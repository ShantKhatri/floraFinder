// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserProfileScreen from "../../screens/userProfile/userProfile";
import FavoritePlantsScreen from "../../screens/userProfile/favoritePlants";
// ... import other screens

const Stack = createStackNavigator();

const UserProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="UserProfileScreen">
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen name="FavoritePlants" component={FavoritePlantsScreen} />
      {/* <Stack.Screen name="ResetPasswordScreen" component={UserProfileScreen} /> */}
      {/* Add other screens here */}
    </Stack.Navigator>
  );
};

export default UserProfileStack;
