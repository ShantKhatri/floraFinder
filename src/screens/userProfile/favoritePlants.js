import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";
import PlantCard from "../../components/plantCard";
import colors from "../../variables/colors";
import { FavouritesContext } from "../../contexts/FavouritesContext";

const FavoritePlantsScreen = ({ navigation }) => {
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
          renderItem={({ item }) => (
            <View style={{ height: 375, marginVertical: 8 }}>
              <PlantCard
                key={item.id}
                plant={item}
                pressKnowMore={(path) =>
                  navigation.navigate("ExploreStack", {
                    screen: "PlantDetails",
                    params: { plantPath: path },
                  })
                }
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };
  return favouritesArray.length ? (
    <View style={styles.container}>{favouritePlants()}</View>
  ) : (
    <View style={styles.container}>
      <View style={{ opacity: 0.5 }}>
        <Image source={require("../../../assets/cryingPlant.png")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: colors.primaryBackground,
  },
});

export default FavoritePlantsScreen;
