import React from "react";
import { View, Text, Image } from "react-native";
import SearchPlantScreen from "./searchPlant";

const HomeScreen = () => {
  // Plant of the day data
  const plantOfTheDay = {
    image: require("../../assets/favicon.png"),
    name: "Rose",
    description:
      "The rose is a classic flower that symbolizes love and beauty.",
  };

  return (
    <View>
      <View>
        <Text>Plant of the Day</Text>
        <Image source={plantOfTheDay.image} />
        <Text>{plantOfTheDay.name}</Text>
        <Text>{plantOfTheDay.description}</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
