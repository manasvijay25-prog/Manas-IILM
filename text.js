// /src/utils/text.js

import "dotenv/config"; // Still needed to load the .env file

import { GoogleGenAI } from "@google/genai";

// 1. Explicitly read the key from the environment variables (loaded by dotenv)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// 2. IMPORTANT: Check if the key was actually loaded
if (!GEMINI_API_KEY) {
  throw new Error(
    "GEMINI_API_KEY is not defined. Check your .env file and ensure it's at the project root."
  );
}

// 3. Pass the key explicitly in the constructor options
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Why is the sky blue?",
  });
  console.log(response.text);
}

main();
