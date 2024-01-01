import { set } from "date-fns";
import React, { createContext, useState } from "react";

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const addToFavourites = (plant) => {
    setFavourites([...favourites, plant]);
  };

  const removeFromFavourites = (plant) => {
    const newFavourites = favourites.filter((p) => p.id !== plant.id);
    setFavourites(newFavourites);
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addToFavourites, removeFromFavourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
