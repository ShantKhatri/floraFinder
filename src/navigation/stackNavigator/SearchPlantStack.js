import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PlantScanner from "../../screens/plantScanner";
import SearchPlantScreen from "../../screens/searchPlant";

const Stack = createStackNavigator();

const SearchPlantStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SearchResult"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SearchResult" component={SearchPlantScreen} />
      <Stack.Screen name="PlantScanner" component={PlantScanner} />
    </Stack.Navigator>
  );
};

export default SearchPlantStack;
