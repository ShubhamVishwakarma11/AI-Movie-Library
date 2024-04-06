import MovieList from "@/components/MovieGrid/MovieList";
import { useFavourite } from "@/hooks/useFavourite";
import { IconLoader2 } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const Favourites = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { favourites, getAllFavourite } = useFavourite();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await getAllFavourite();
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="px-2 w-full h-full flex flex-col gap-6 justify-center items-center mt-12">
      <span className="text-2xl">Your Favourites</span>
      {isLoading ? (
        <div className="">
          <IconLoader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : favourites && favourites.length === 0 ? (
        "Start adding movies to your favourite list"
      ) : (
        <MovieList movies={favourites} type="favourite" />
      )}
    </div>
  );
};

export default Favourites;
