import { TMovie } from "@/types/movie";
import MovieItem from "./MovieItem";

const MovieList = ({ movies }: { movies: TMovie[] }) => {
  return (
    <div className="pt-12 flex flex-col justify-center items-center gap-2 w-full">
      {movies.map((movie) => (
        <MovieItem key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
