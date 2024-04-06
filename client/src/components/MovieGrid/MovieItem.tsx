import { TMovie } from "@/types/movie";
import {
  IconChevronRight,
  IconLoader2,
  IconPlus,
  IconStar,
  IconTrash,
} from "@tabler/icons-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFavourite } from "@/hooks/useFavourite";

const MovieItem = ({
  movie,
  type,
}: {
  movie: TMovie;
  type: "search" | "favourite";
}) => {
  const { addFavourite, removeFavourite, checkIfFavourite } = useFavourite();
  const [loading, setLoading] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const navigate = useNavigate();

  const handleAddFavourite = async () => {
    setLoading(true);
    await addFavourite(movie.movieId);
    setLoading(false);
  };

  const handleRemoveFavourite = async () => {
    setLoading(true);
    await removeFavourite(movie.movieId);
    setLoading(false);
  };

  useEffect(() => {
    if (type === "favourite") setIsFavourite(true);
    (async () => {
      const data = await checkIfFavourite(movie.movieId);
      setIsFavourite(data);
    })();
  }, []);

  return (
    <div className="flex sm:flex-row flex-col sm:items-start items-center border border-border rounded-md h-full w-full gap-2 p-4 relative">
      <div className="sm:w-[15%] w-[100%]">
        <img src={movie.img} alt={movie.title} className="w-full" />
      </div>
      <div className="w-[85%] flex flex-col  sm:items-start items-center justify-start h-full gap-2 p-4">
        <div className="flex flex-col justify-start items-start w-full gap-2 ">
          <div className="flex sm:flex-row flex-col items-center justify-between w-full gap-2">
            <div className="text-xl">{movie.title}</div>
            <div className="bg-brand py-2 px-3 rounded-md">
              {movie.type === "movie" ? "Movie" : "Series"}
            </div>
          </div>
          <div className="text-muted-foreground w-full sm:text-start text-center">
            {movie.year}
          </div>
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
      <div className="sm:absolute  relative sm:right-6  bottom-6 p-4 flex items-center justify-center gap-2 ">
        {isFavourite && (
          <IconStar className="text-yellow-500 fill-yellow-500" />
        )}

        <Button
          disabled={loading}
          onClick={!isFavourite ? handleAddFavourite : handleRemoveFavourite}
          variant="secondary"
          className="border border-border rounded-md  "
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <IconLoader2 className=" animate-spin" />
              <span>{!isFavourite ? "Adding" : "Removing"}</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              {!isFavourite ? <IconPlus /> : <IconTrash />}

              <span>
                {!isFavourite ? "Add to Favourite" : "Remove from Favourite"}
              </span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MovieItem;
