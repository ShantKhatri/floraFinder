import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SearchPlantScreen from "./src/screens/searchPlant";
import PlantCard from "./src/components/plantCard";
import ExploreScreen from "./src/screens/exploreScreen";
import HomeScreen from "./src/screens/homeScreen";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <SearchPlantScreen />
      {/* <PlantCard /> */}
      {/* <ExploreScreen /> */}
      {/* <HomeScreen /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
