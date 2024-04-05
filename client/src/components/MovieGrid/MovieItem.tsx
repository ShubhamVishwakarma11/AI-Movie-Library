import { TMovie } from "@/types/movie";
import { IconLoader2, IconPlus } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { addFavouriteMovie } from "@/api/favourite";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "../ui/use-toast";
import { useState } from "react";

const MovieItem = ({ movie }: { movie: TMovie }) => {
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

    const data = await addFavouriteMovie(movie.imdbID, token);
    setLoading(false);
    if (data) navigate("/movie");
  };

  return (
    <div className="flex border border-border rounded-md w-full p-4 relative">
      <div className="w-[15%]">
        <img src={movie.Poster} />
      </div>
      <div className="w-[85%] flex flex-col items-start justify-start p-4">
        <div className="flex items-center justify-between w-full">
          <div className="text-xl">{movie.Title}</div>
          <div className="bg-brand py-2 px-3 rounded-md">
            {movie.Type === "movie" ? "Movie" : "Series"}
          </div>
        </div>
        <div className="text-muted-foreground">{movie.Year}</div>
      </div>
      <Button
        disabled={loading}
        onClick={handleAddFavourite}
        variant="secondary"
        className="border border-border rounded-md  absolute right-6 bottom-6 p-4  "
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <IconLoader2 className=" animate-spin" />
            <span>Adding</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <IconPlus />
            <span>Add to Favourite</span>
          </div>
        )}
      </Button>
    </div>
  );
};

export default MovieItem;
