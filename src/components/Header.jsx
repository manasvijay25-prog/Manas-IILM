import { signOut, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../utils/firbase";
import { useNavigate } from "react-router";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { toggleGptSearch } from "../utils/gptSlice";
import { setLanguage } from "../utils/configSlice";
import { useSelector } from "react-redux";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearch());
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch, navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        navigate("/error");
      });

    setIsDropdownOpen(false);
  };

  const handleLogoClick = () => {
    if (showGptSearch) {
      dispatch(toggleGptSearch());
    } else {
      navigate(auth?.currentUser ? "/browse" : "/");
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full px-8 py-4 bg-gradient-to-b from-black/80 to-transparent z-50 flex justify-between items-center">
      
      <h1 
        onClick={handleLogoClick}
        className="text-red-600 font-bold text-3xl md:text-4xl tracking-widest cursor-pointer drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform uppercase"
      >
        CINEVERSE
      </h1>

      <div className="flex items-center gap-4">
        
         {showGptSearch && <div className="flex items-center gap-4">
            <select
              onChange={handleLanguageChange}
              className="bg-gradient-to-r from-neutral-800 to-neutral-900 border border-neutral-700 hover:border-neutral-500 px-4 py-2 rounded-md text-white font-medium transition-all duration-200 cursor-pointer"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>}
        

        <button
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white font-semibold tracking-wide transition-all duration-300 shadow-md border border-red-500/50 flex items-center gap-2"
          onClick={handleGptSearchClick}
        >
          {!showGptSearch ? "✨ ASK CINEVERSE" : "🏠 HOME"}
        </button>

        {auth?.currentUser && (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-10 h-10 rounded-md bg-stone-600 hover:bg-stone-500 flex items-center justify-center text-white font-bold transition-all duration-200 shadow-md border border-stone-400"
            >
              U
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-[#141414] rounded-md shadow-2xl border border-neutral-700 z-50 overflow-hidden">
                <button
                  type="button"
                  className="w-full text-left px-4 py-3 text-white hover:bg-neutral-800 transition-colors duration-150 font-medium"
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
