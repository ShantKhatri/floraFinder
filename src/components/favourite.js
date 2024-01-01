import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FavouritesContext } from "../contexts/FavouritesContext";

const FavouriteButton = ({ plant }) => {
  //   console.log("PLANT", plant.id);
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);
  const [isFavourite, setIsFavourite] = useState(
    favourites.find((p) => p.id === plant.id)
  );
  useEffect(() => {
    setIsFavourite(favourites.find((p) => p.id === plant.id));
  }, [favourites]);
  // let isFavourite = favourites.find((p) => p.id === plant.id);

  const handlePress = () => {
    if (!isFavourite) {
      addToFavourites(plant);
    } else {
      removeFromFavourites(plant);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <AntDesign
        name={isFavourite ? "heart" : "hearto"}
        size={24}
        color={isFavourite ? "red" : "black"}
      />
    </TouchableOpacity>
  );
};

export default FavouriteButton;
