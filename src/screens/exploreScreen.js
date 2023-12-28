import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ExploreScreen = ({ navigation }) => {
  // Define an array of species or classifications
  const species = [
    { id: 1, name: "Species 1" },
    { id: 2, name: "Species 2" },
    { id: 3, name: "Species 3" },
    // Add more species as needed
  ];

  // Function to handle species selection
  const handleSpeciesSelection = (speciesId) => {
    // Navigate to the screen showing plants with the selected species
    navigation.navigate("PlantsScreen", { speciesId });
  };

  return (
    <View>
      <Text>Explore Screen</Text>
      {species.map((speciesItem) => (
        <TouchableOpacity
          key={speciesItem.id}
          onPress={() => handleSpeciesSelection(speciesItem.id)}
        >
          <Text>{speciesItem.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ExploreScreen;
