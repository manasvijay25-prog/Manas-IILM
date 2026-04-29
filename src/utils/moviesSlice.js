import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movie",
  initialState: {
    nowPlayingMovies: null,
    trailerVideo: null,
    popularMovies: null,
    trendingMovies: null,
    isTrailerModalOpen: false,
    trailerModalVideoId: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },
    setTrailerModalOpen: (state, action) => {
      state.isTrailerModalOpen = action.payload;
    },
    setTrailerModalVideoId: (state, action) => {
      state.trailerModalVideoId = action.payload;
    },
  },
});


export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addTrendingMovies,
  setTrailerModalOpen,
  setTrailerModalVideoId,
} = moviesSlice.actions; 
export default moviesSlice.reducer