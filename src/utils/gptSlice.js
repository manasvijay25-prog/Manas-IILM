import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        showGptSearch: false,
        recommendations: [],
        raw: null,
        isSearching: false,
        mood: "neutral",
    },
    reducers: {
        toggleGptSearch: (state) => {
            state.showGptSearch = !state.showGptSearch ;
        },
        addGeminiRecommendations: (state, action) => {
            const { recommendations, raw, mood } = action.payload;
            state.raw = raw;
            state.recommendations = recommendations;
            state.mood = mood || "neutral";
        },
        setIsSearching: (state, action) => {
            state.isSearching = action.payload;
        }
    }
})

export const { toggleGptSearch, addGeminiRecommendations, setIsSearching } = gptSlice.actions;
export default gptSlice.reducer;