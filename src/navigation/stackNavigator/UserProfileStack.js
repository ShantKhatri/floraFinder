// App.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserProfileScreen from "../../screens/userProfile/userProfile";
import FavoritePlantsScreen from "../../screens/userProfile/favoritePlants";

const Stack = createStackNavigator();

const UserProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="UserProfileScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen name="FavoritePlants" component={FavoritePlantsScreen} />
      {/* <Stack.Screen name="ResetPasswordScreen" component={UserProfileScreen} /> */}
    </Stack.Navigator>
  );
};

export default UserProfileStack;
