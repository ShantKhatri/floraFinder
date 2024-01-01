import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import PlantCard from "../../components/plantCard";
import colors from "../../variables/colors";
import { FavouritesContext } from "../../contexts/FavouritesContext";

const FavoritePlantsScreen = () => {
  const { favourites } = useContext(FavouritesContext);
  let favouritesArray = [...favourites];
  useEffect(() => {
    favouritesArray = [...favourites];
    for (let id of favouritesArray) {
      console.log(id.id);
    }
  }, [favourites]);

  const favouritePlants = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <FlatList
          data={favouritesArray}
          renderItem={({ item }) => <PlantCard key={item.id} plant={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };
  return favouritesArray.length ? (
    <View style={styles.container}>{favouritePlants()}</View>
  ) : (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>No Favourite Plants</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: colors.primaryBackground,
  },
});

export default FavoritePlantsScreen;
