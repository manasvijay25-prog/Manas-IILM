import { API_KEY } from "../utils/constants";

export const getGeminiRecommendations = async (query) => {
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;


  const payload = {
    contents: [{ parts: [{ text: query }] }],
    tools: [{ google_search: {} }],
    systemInstruction: {
      parts: [
        {
          text: "Act as a world-class movie recommendation expert. Based on the user's query, do two things:\n1) On the first line, provide exactly 5 movie titles separated by commas.\n2) On the second line, provide a single mood keyword from this list exactly: [scary, funny, romantic, action, sci-fi, dramatic, neutral].\nDo not include any other text.",
        },
      ],
    },
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(apiUrl, options);
    const result = await response.json();


    const fullText =
      result.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const lines = fullText.trim().split('\n');
    const textMovies = lines[0] || "Sorry, no recommendations could be generated for that query.";
    const movies = textMovies.split(',').map(m => m.trim());
    const mood = lines.length > 1 ? lines[lines.length - 1].trim().toLowerCase() : "neutral";

    return { movies, mood };
  } catch (error) {
    console.error("Error during Gemini API call:", error);
    throw error;
  }
};
