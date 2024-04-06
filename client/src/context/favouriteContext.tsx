import {
  addFavouriteMovie,
  getAllFavouriteMovies,
  removeFavouriteMovie,
} from "@/api/favourite";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { TMovie } from "@/types/movie";
import { ReactElement, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface TFavouriteContext {
  favourites: TMovie[];
  addFavourite: (movieId: string) => Promise<void>;
  removeFavourite: (movieId: string) => Promise<void>;
  checkIfFavourite: (movieId: string) => Promise<boolean>;
  getAllFavourite: () => Promise<void>;
}

const initFavouriteContext = {
  favourites: [],
  addFavourite: () => {
    return Promise.resolve();
  },
  removeFavourite: () => {
    return Promise.resolve();
  },
  checkIfFavourite: () => {
    return Promise.resolve(false);
  },
  getAllFavourite: () => {
    return Promise.resolve();
  },
};

export const FavouriteContext =
  createContext<TFavouriteContext>(initFavouriteContext);

export const FavouriteContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [favourites, setFavourites] = useState<TMovie[]>([]);
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();

  const getAllFavourite = async () => {
    if (!isAuthenticated || favourites.length !== 0) return;
    const data = await getAllFavouriteMovies(token);
    if (data) setFavourites(data);
  };

  const addFavourite = async (movieId: string) => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You need to signup first to add a movie to favourites",
      });
    }

    const data = await addFavouriteMovie(movieId, token);
    if (data) {
      setFavourites(data.favourites);
      navigate(`/movie/${movieId}`);
    }
  };

  const removeFavourite = async (movieId: string) => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You need to signup first to add a movie to favourites",
      });
    }
    const data = await removeFavouriteMovie(movieId, token);
    if (data) {
      setFavourites((prev) =>
        prev.filter((movie) => movie.movieId !== movieId)
      );
      navigate("/favourites");
    }
  };

  const checkIfFavourite = async (movieId: string) => {
    if (favourites.length === 0) {
      await getAllFavourite();
    }
    const data = favourites.find((fav) => fav.movieId === movieId);
    if (data) return true;
    return false;
  };

  return (
    <FavouriteContext.Provider
      value={{
        favourites,
        addFavourite,
        removeFavourite,
        getAllFavourite,
        checkIfFavourite,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};
