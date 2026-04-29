import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  if (!movies || !movies.nowPlayingMovies) return null;

  return (
    <div>
      <div
        className="
        bg-transparent
          relative
          z-100
          -mt-40
          rounded-t-2xl
          pb-10
        "
      >
        <MoviesList title="Now Playing" movies={movies.nowPlayingMovies} />
        <MoviesList title="Popular" movies={movies.popularMovies} />
        <MoviesList title="Top Rated" movies={movies.trendingMovies} />
        <MoviesList title="Upcoming" movies={movies.nowPlayingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
