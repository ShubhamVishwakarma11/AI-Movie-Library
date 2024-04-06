import { TMovie } from "@/types/movie";
import {
  IconChevronRight,
  IconLoader2,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { Button } from "../ui/button";
import { addFavouriteMovie, removeFavouriteMovie } from "@/api/favourite";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "../ui/use-toast";
import { useState } from "react";

const MovieItem = ({
  movie,
  type,
}: {
  movie: TMovie;
  type: "search" | "favourite";
}) => {
  const { token, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddFavourite = async () => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You need to signup first to add a movie to favourites",
      });
    }

    setLoading(true);

    const data = await addFavouriteMovie(movie.movieId, token);
    setLoading(false);
    if (data) navigate(`/movie/${movie.movieId}`);
  };

  const handleRemoveFavourite = async () => {
    const data = await removeFavouriteMovie(movie.movieId, token);
    if (data) navigate("/favourites");
    setLoading(false);
  };

  return (
    <div className="flex border border-border rounded-md w-full p-4 relative">
      <div className="w-[15%]">
        <img src={movie.img} alt={movie.title} />
      </div>
      <div className="w-[85%] flex flex-col items-start justify-between p-4">
        <div className="flex flex-col justify-start items-start w-full">
          <div className="flex items-center justify-between w-full">
            <div className="text-xl">{movie.title}</div>
            <div className="bg-brand py-2 px-3 rounded-md">
              {movie.type === "movie" ? "Movie" : "Series"}
            </div>
          </div>
          <div className="text-muted-foreground">{movie.year}</div>
        </div>
        {type === "favourite" && (
          <Button
            className="flex items-center justify-center gap-1"
            onClick={() => navigate(`/movie/${movie.movieId}`)}
          >
            <span className="">View Movie Details</span>{" "}
            <IconChevronRight className="w-5 h-5" />
          </Button>
        )}
      </div>
      <Button
        disabled={loading}
        onClick={type === "search" ? handleAddFavourite : handleRemoveFavourite}
        variant="secondary"
        className="border border-border rounded-md  absolute right-6 bottom-6 p-4  "
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <IconLoader2 className=" animate-spin" />
            <span>{type === "search" ? "Adding" : "Removing"}</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            {type === "search" ? <IconPlus /> : <IconTrash />}

            <span>
              {type === "search" ? "Add to Favourite" : "Remove from Favourite"}
            </span>
          </div>
        )}
      </Button>
    </div>
  );
};

export default MovieItem;
