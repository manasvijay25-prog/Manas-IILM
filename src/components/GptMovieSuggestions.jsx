import React from "react";
import { useSelector } from "react-redux";
import ShimmerScreen from "./ShimmerScreen";
import MoviesList from "./MoviesList";

const GptMovieSuggestions = () => {
  const recommendations = useSelector((state) => state.gpt.recommendations);
  const raw = useSelector((state) => state.gpt.raw);
  const isSearching = useSelector((state) => state.gpt.isSearching || false);


  if (!recommendations || recommendations.length === 0) {
    return isSearching ? <ShimmerScreen /> : null;
  }

  return (
    <div className="-mt-[20%] relative w-full h-full bg-linear-to-br from-neutral-900/60 to-neutral-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-neutral-700 p-2 m-4 overflow-x-hidden">
      <div className="flex flex-col overflow-x-scroll whitespace-nowrap space-x-4 pb-4 z-100 overflow-scroll w-full">
        {raw.map((movie, ind) => (
          <MoviesList
            key={ind}
            title={movie}
            movies={recommendations[ind]?.results || []}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
