import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserProfileScreen from "../../screens/userProfile/userProfile";
import FavoritePlantsScreen from "../../screens/userProfile/favoritePlants";
import CameraImagePicker from "../../screens/userProfile/cameraImagePicker";
import UserDetails from "../../screens/userProfile/userDetails";

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
      <Stack.Screen name="CameraImagePicker" component={CameraImagePicker} />
      <Stack.Screen name="UserDetails" component={UserDetails} />
    </Stack.Navigator>
  );
};

export default UserProfileStack;
