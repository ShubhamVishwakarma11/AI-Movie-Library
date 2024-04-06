import { FavouriteContext } from "@/context/favouriteContext";
import { useContext } from "react";

export const useFavourite = () => {
  const context = useContext(FavouriteContext);

  if (!context) {
    throw new Error(
      "useFavourite must be wrapped inside FavouriteContextProvider"
    );
  }

  return context;
};
