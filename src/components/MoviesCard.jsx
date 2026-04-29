import { IMG_CDN_URL, API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setTrailerModalOpen, setTrailerModalVideoId } from "../utils/moviesSlice";

const MoviesCard = ({ posterPath, movieId }) => {
  const dispatch = useDispatch();

  const handleCardClick = async () => {
    if (!movieId) return;
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS);
      const json = await response.json();
      
      const filterData = json.results?.filter((video) => video.type === "Trailer");
      const trailer = filterData?.length ? filterData[0] : json.results?.[0];
      
      if (trailer?.key) {
        dispatch(setTrailerModalVideoId(trailer.key));
        dispatch(setTrailerModalOpen(true));
      } else {
        alert("Trailer not available");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  if (!posterPath) {
    return null; // or a placeholder image/component
  }
  return (
    <div 
      className="w-48 pr-4 shrink-0 cursor-pointer transition-transform hover:scale-105" 
      onClick={handleCardClick}
    >
      <img
        className="w-48 rounded-2xl "
        alt="Movie Card"
        src={IMG_CDN_URL + posterPath}
      />
    </div>
  );
};

export default MoviesCard;
