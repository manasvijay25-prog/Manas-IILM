import bgImage from "../assets/background.avif";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { useSelector } from "react-redux";

const MOOD_GRADIENTS = {
  scary: "from-red-950 via-black to-black",
  funny: "from-amber-600 via-orange-900 to-black",
  romantic: "from-pink-900 via-rose-950 to-black",
  action: "from-slate-800 via-gray-900 to-black",
  "sci-fi": "from-teal-900 via-cyan-950 to-black",
  dramatic: "from-indigo-950 via-blue-950 to-black",
  neutral: "from-neutral-900 via-black to-black"
};

const GptSearch = () => {
  const mood = useSelector(store => store.gpt.mood);
  const bgClass = MOOD_GRADIENTS[mood] || MOOD_GRADIENTS.neutral;

  return (
    <div className={`relative min-h-screen w-full transition-colors duration-1000 bg-gradient-to-b ${bgClass}`}>
      <img
        src={bgImage}
        className="fixed inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 z-0"
        alt=""
      />

      <div className="relative z-10 pt-[5%]">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </div>
  );
};

export default GptSearch;
