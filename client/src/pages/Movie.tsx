import { getAFavouriteMovie } from "@/api/favourite";
import { getAIMovieSummary } from "@/api/summary";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import { TMovie } from "@/types/movie";
import { IconLoader2, IconSparkles, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Movie = () => {
  const { movieId } = useParams();
  const { isAuthenticated, token } = useAuth();
  const [movie, setMovie] = useState<TMovie>();
  const [genres, setGenres] = useState([]);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [AISummary, setAISummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!isAuthenticated || !movieId) return;
      setIsLoading(true);
      const data = await getAFavouriteMovie(movieId, token);
      if (data) {
        setMovie(data);
        const out = data.genre.split(", ");
        setGenres(out);
      }
      setIsLoading(false);
    })();
  }, []);

  const handleGetAISummary = async () => {
    if (!isAuthenticated || !movieId) return;
    setIsSummaryLoading(true);
    const data = await getAIMovieSummary(movieId, token);
    if (data) {
      setAISummary(data);
    }
    setIsSummaryLoading(false);
  };

  return (
    <div className="px-4 w-full h-full flex flex-col gap-6 justify-center items-center mt-[5rem] ">
      {isLoading ? (
        <div className="flex w-full justify-center items-start h-[80vh]">
          <IconLoader2 className="w-12 h-12 animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row w-full justify-center md:items-start items-center gap-4">
          <div className="md:w-[30%] w-[60%]">
            <img
              src={movie?.img}
              alt={movie?.title}
              className="w-[24rem] h-auto"
            />
          </div>
          <div className="md:w-[40%] w-[80%] flex flex-col justify-start md:items-start items-center gap-10">
            <div className="text-6xl font-semibold w-full text-center md:text-start">
              {movie?.title}
            </div>
            <div className="text-lg">
              <div className="flex flex-col sm:flex-row justify-start items-center gap-6">
                <div className="flex gap-1">
                  <span className="text-muted-foreground ">IMDB Rating:</span>
                  <span> {movie?.imdbRating}</span>
                </div>
                <div className="flex gap-1">
                  <span className="text-muted-foreground">Released:</span>
                  <span> {movie?.released}</span>
                </div>
                <div className="flex gap-1">
                  <span className="text-muted-foreground">Language:</span>
                  <span> {movie?.language}</span>
                </div>
              </div>
            </div>
            <div className="text-md flex justify-start items-center gap-3">
              {genres.map((genre, idx) => (
                <span key={idx} className="bg-brand px-3 py-2 rounded-full">
                  {genre}
                </span>
              ))}
              <span className="bg-muted px-3 py-2 rounded-full">
                {movie?.runtime}
              </span>
            </div>
            {/* AI Summary */}
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  onClick={handleGetAISummary}
                  size="lg"
                  className="rounded-full text-md gap-2"
                >
                  <span className="text-brand"> Get AI Movie Summary</span>{" "}
                  <IconSparkles className="text-brand" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="dark bg-background text-foreground">
                <div className=" w-full min-h-[30vh] max-h-[80vh] relative p-12">
                  <ScrollArea className=" h-[65vh] md:h-[45vh] flex gap-2 flex-col justify-center w-[70%] md:w-[70%] items-center mx-auto text-center">
                    <DrawerHeader>
                      <span className="text-3xl w-full text-center">
                        {" "}
                        AI Movie Summary
                      </span>
                    </DrawerHeader>
                    <div className="text-lg  text-justify">
                      {isSummaryLoading ? (
                        <span className="">
                          <IconLoader2 className="w-8 h-8 animate-spin" />
                        </span>
                      ) : (
                        <span>{AISummary}</span>
                      )}
                    </div>
                  </ScrollArea>

                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      className="p-2 rounded-full absolute top-0 right-6"
                    >
                      <IconX className="w-5 h-5" />
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerContent>
            </Drawer>
            <div className="text-lg text-justify">{movie?.plot}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
