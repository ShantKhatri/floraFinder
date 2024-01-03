import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ExploreScreen from "../../screens/explore/exploreScreen";
import PlantDetails from "../../screens/explore/plantDetails";

const Stack = createStackNavigator();

const ExploreStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="PlantDetails" component={PlantDetails} />
    </Stack.Navigator>
  );
};

export default ExploreStack;
