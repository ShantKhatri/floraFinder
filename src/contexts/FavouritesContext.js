import AsyncStorage from "@react-native-async-storage/async-storage";
import { set } from "date-fns";
import React, { createContext, useEffect, useState } from "react";

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const saveFavourites = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@favourites`, jsonValue);
    } catch (e) {
      console.log("error storing", e);
    }
  };

  const loadFavourites = async () => {
    try {
      const value = await AsyncStorage.getItem(`@favourites`);
      if (value !== null) {
        setFavourites(JSON.parse(value));
      }
    } catch (e) {
      console.log("error loading", e);
    }
  };

  const addToFavourites = (plant) => {
    setFavourites([...favourites, plant]);
  };

  const removeFromFavourites = (plant) => {
    const newFavourites = favourites.filter((p) => p.id !== plant.id);
    setFavourites(newFavourites);
  };

  useEffect(() => {
    loadFavourites();
  }, []);

  useEffect(() => {
    if (favourites.length) {
      saveFavourites(favourites);
    }
  }, [favourites]);

  return (
    <FavouritesContext.Provider
      value={{ favourites, addToFavourites, removeFromFavourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
