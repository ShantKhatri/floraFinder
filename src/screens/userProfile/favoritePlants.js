// FavoritePlantsScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FavoritePlantsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Favorite Plants</Text>
      {/* Implement the content */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});

export default FavoritePlantsScreen;
