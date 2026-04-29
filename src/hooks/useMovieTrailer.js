import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (id) => {

  const dispatch = useDispatch();
  const trailerVideo = useSelector((state) => state.movies.trailerVideo);

  const getMoviesVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/"
      +id+"/videos?language=en-US",
      API_OPTIONS
    );

    const json = await data.json();
    // console.log(json)

    const filterData = json.results.filter((video) => video.type === "Trailer");

    // console.log(filterData)

    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    !trailerVideo && getMoviesVideo();
  }, []);
};

export default useMovieTrailer;
