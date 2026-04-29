import MoviesCard from "./MoviesCard";

const MoviesList = ({ title = "Movies", movies }) => {
  return (
    <div className="pt-2 pl-8 relative z-10">
      <h1 className="text-2xl mb-3 text-white p-2 m-2">{title}</h1>

      <div
        className="flex overflow-x-scroll whitespace-nowrap space-x-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {movies?.map((movie) => (
          <MoviesCard key={movie.id} posterPath={movie.poster_path} movieId={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
