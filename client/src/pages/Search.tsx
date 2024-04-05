import { SearchMovie } from "@/api/search";
import MovieList from "@/components/MovieGrid/MovieList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TMovie } from "@/types/movie";
import { IconDeviceTv } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<TMovie[]>([]);
  const fetchMovie = () => {
    const getMovie = setTimeout(async () => {
      if (query) {
        const data = await SearchMovie(query);
        if (data) setMovies(data);
      }
    }, 1000);
    return () => clearTimeout(getMovie);
  };
  useEffect(() => {
    const getMovie = setTimeout(async () => {
      if (query) {
        const data = await SearchMovie(query);
        if (data) setMovies(data);
      }
    }, 1000);
    return () => clearTimeout(getMovie);
  }, [query]);

  return (
    <div className="px-2 w-full h-full flex flex-col gap-6 justify-center items-center mt-12">
      <div className="flex gap-2 w-full">
        <Input
          type="text"
          id="search"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="text-lg"
        />
        <Button
          onClick={fetchMovie}
          variant="secondary"
          className="bg-brand text-lg"
        >
          Search
        </Button>
      </div>
      {movies && movies.length === 0 ? (
        <div className="flex justify-center items-center gap-2 flex-col pt-12">
          <IconDeviceTv className="w-12 h-12 " />
          <span className="text-lg font-regular">
            Search for your favourite movies
          </span>
        </div>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default Search;
