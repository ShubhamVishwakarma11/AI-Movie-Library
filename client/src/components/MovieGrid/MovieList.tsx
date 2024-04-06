import { TMovie } from "@/types/movie";
import MovieItem from "./MovieItem";

const MovieList = ({
  movies,
  type,
}: {
  movies: TMovie[];
  type: "search" | "favourite";
}) => {
  return (
    <div className="pt-2 flex flex-col justify-center items-center gap-2 w-full">
      {movies.map((movie) => (
        <MovieItem key={movie.movieId} movie={movie} type={type} />
      ))}
    </div>
  );
};

export default MovieList;
