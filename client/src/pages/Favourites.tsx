import { getAllFavouriteMovies } from "@/api/favourite";
import MovieList from "@/components/MovieGrid/MovieList";
import { useAuth } from "@/hooks/useAuth";
import { TMovie } from "@/types/movie";
import { useEffect, useState } from "react";

const Favourites = () => {
  const [movies, setMovies] = useState<TMovie[]>([]);
  const { isAuthenticated, token } = useAuth();

  useEffect(() => {
    (async () => {
      if (!isAuthenticated) return;
      const data = await getAllFavouriteMovies(token);
      console.log("MOVIES", data);
      if (data) setMovies(data);
    })();
  }, []);

  return (
    <div className="px-2 w-full h-full flex flex-col gap-6 justify-center items-center mt-12">
      <span className="text-xl">Your Favourites</span>
      {movies && movies.length === 0 ? (
        "Start adding movies to your favourite list"
      ) : (
        <MovieList movies={movies} type="favourite" />
      )}
    </div>
  );
};

export default Favourites;
