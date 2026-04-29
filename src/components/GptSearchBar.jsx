import { useSelector } from "react-redux";
import React from "react";
import lang from "../utils/languageConstants";
import { getGeminiRecommendations } from "../hooks/useGeminiAPICall";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addGeminiRecommendations, setIsSearching } from "../utils/gptSlice";


const GptSearchBar = () => {
  const langKey = useSelector((state) => state.config.lang);
  const [query, setQuery] = React.useState("");
  const [isListening, setIsListening] = React.useState(false);
  const inputRef = React.useRef(null);

  const dispatch = useDispatch();

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice search.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      if (inputRef.current) {
        inputRef.current.value = transcript;
      }
      handleGeminiSearch(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1", API_OPTIONS
    );

    const json = await data.json();
    return json;
  }

  const handleGeminiSearch = async (overrideQuery) => {
    const searchText = typeof overrideQuery === 'string' ? overrideQuery : query;
    if (!searchText) return;
    console.log(searchText);

    dispatch(setIsSearching(true));

    const geminiQuery =
      "Recommend some movies or shows about " +
      searchText +
      ".";

    try {
      const response = await getGeminiRecommendations(geminiQuery);
      console.log("Recommendations:", response.movies, "Mood:", response.mood);

      const movieData = response.movies.map((movie) => searchMovieTMDB(movie.trim()));

      const moviesResults = await Promise.all(movieData);
      console.log("Movies Data:", moviesResults);

      dispatch(addGeminiRecommendations({ recommendations: moviesResults, raw: response.movies, mood: response.mood }));

    } catch (error) {
      console.error("Failed to get recommendations:", error);
    } finally {
      dispatch(setIsSearching(false));
    }
  };

  const handleGenreClick = (genreText) => {
    setQuery(genreText);
    if (inputRef.current) {
      inputRef.current.value = genreText;
    }
    handleGeminiSearch(genreText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGeminiSearch();
  };

  return (
    <div
      className="min-h-screen flex items-start justify-center bg-transparent
 px-4"
    >
      <div className="w-full max-w-3xl mt-28 p-6 sm:p-10 bg-linear-to-br from-neutral-900/60 to-neutral-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-neutral-700">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
          {lang[langKey]?.title || "Find Your Next Movie or Show"}
        </h2>
        <p className="text-sm text-neutral-300 mb-6">
          {lang[langKey]?.subtitle ||
            "Ask the assistant for recommendations or search titles directly."}
          .
        </p>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <label htmlFor="gpt-search" className="sr-only">
            {lang[langKey]?.searchLabel || "Search for movies or shows"}
          </label>

          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </span>

            <input
              id="gpt-search"
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                lang[langKey]?.searchPlaceholder ||
                "What would you like to watch?"
              }
              className="w-full pl-12 pr-16 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20 focus:ring-2 focus:ring-rose-500/60 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
            />

            <button
              type="button"
              onClick={handleVoiceSearch}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                isListening 
                  ? "bg-rose-500/80 text-white animate-pulse shadow-[0_0_15px_rgba(225,29,72,0.6)]" 
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
              title="Voice Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
              </svg>
            </button>
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 active:scale-95 text-white font-bold tracking-wide rounded-full shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_30px_rgba(225,29,72,0.6)] border border-rose-500/30 transition-all duration-300 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            {lang[langKey]?.searchButton || "Search"}
          </button>
        </form>

        <div className="mt-8">
          <p className="text-sm text-neutral-400 mb-3 font-medium uppercase tracking-wider text-center sm:text-left">
            {lang[langKey]?.moodLabel || "Or pick a mood:"}
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            {[
              { emoji: "😆", label: "Comedy", query: "A hilarious comedy movie that will make me laugh out loud" },
              { emoji: "😭", label: "Tearjerker", query: "An emotional tearjerker movie that will make me cry" },
              { emoji: "🤯", label: "Mind-Bending", query: "A mind-bending psychological thriller with plot twists" },
              { emoji: "😱", label: "Terrifying", query: "A terrifying horror movie with jump scares" },
              { emoji: "🦸‍♂️", label: "Action Packed", query: "An action-packed superhero or spy movie" }
            ].map((mood, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleGenreClick(mood.query)}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-800/60 text-neutral-200 rounded-full border border-neutral-700 hover:bg-neutral-700 hover:border-neutral-400 hover:text-white transition-all duration-300 cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.4)] hover:-translate-y-0.5"
              >
                <span className="text-lg">{mood.emoji}</span>
                <span className="text-sm font-medium">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GptSearchBar;