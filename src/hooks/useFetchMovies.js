import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useSelector } from "react-redux";


const useFetchMovies = () => {
    const dispatch = useDispatch();

    const nowPlayingMovies = useSelector(
      (state) => state.movies.nowPlayingMovies
    );

    const getNowPlayingMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        API_OPTIONS
      );

      const json = await data.json();
      // console.log(json.results)
      dispatch(addNowPlayingMovies(json.results));
    };

    useEffect(() => {
     !nowPlayingMovies && getNowPlayingMovies();
    }, []);
};

export default useFetchMovies