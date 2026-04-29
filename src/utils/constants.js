const LOGO =
  "https://assets.nflxext.com/ffe/siteui/vlv3/a92a67ee-cd07-46a8-8354-c431a96a97b0/web/IN-en-20251103-TRIFECTA-perspective_8a65e995-9926-414c-83c5-f7cc9af10871_medium.jpg";

export default LOGO

export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
  }
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500"

export const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;