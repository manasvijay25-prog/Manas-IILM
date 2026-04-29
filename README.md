# 🎬 Netflix-GPT

### AI-Powered Movie Discovery Platform

**Netflix-GPT** is a high-performance streaming platform clone that integrates **React**, **Redux**, and **Gemini API** to solve the classic _“What should I watch?”_ problem using **natural language search**.

## 🚀 Project Overview

Netflix-GPT goes beyond a traditional Netflix clone. It acts as an **intelligent movie discovery engine**, allowing users to search for content using **contextual prompts** instead of exact titles.

> Example: _“Movies about space travel that aren’t horror”_

By combining a cinematic UI with powerful AI models, the app delivers smarter and more personalized recommendations.

## 🛠️ Technical Stack

| Layer | Technology |
| --- | --- |
| **Frontend** | React.js (Hooks, React Router) |
| **Styling** | Tailwind CSS (Responsive Design) |
| **State Management** | Redux Toolkit |
| **AI Integration** | Gemini API |
| **Data Source** | TMDB (The Movie Database) API |
| **Authentication** | Firebase Authentication |

## ✨ Key Features

* **AI Search Bar**: Search movies using natural language prompts powered by Gemini AI models.
* **Dynamic Hero Section**: Auto-playing background trailers fetched directly from TMDB.
* **Responsive UI**: Mobile-first design using Tailwind CSS and modern CSS layout principles.
* **Secure Authentication**: Firebase-powered login and signup with real-time validation.
* **Multi-Language Support**: Language switching for the GPT search interface _(English, Hindi, Spanish)_.

## 📐 System Architecture

The application follows a **strict unidirectional data flow** to maintain a single source of truth.

### Data Flow Breakdown

1. **Authentication**
   * User state is managed globally using `userSlice`.
2. **AI Data Orchestration**
   * User enters a prompt in the GPT search bar.
   * The app sends the prompt to the **Gemini API** to fetch recommended movie titles.
   * For each movie title, a secondary request is made to the **TMDB API**.
   * Results are combined and stored in `gptSlice` for rendering.

## 💻 Code Highlights

### AI Integration with Promise.all

To prevent UI blocking while fetching multiple movie details, the app uses **Promise.all** to handle concurrent API calls efficiently.

```javascript
const moviePromises = movieNames.map((movie) => fetchMovieDetailsFromTMDB(movie));
const movieResults = await Promise.all(moviePromises);
```

This ensures:
* Faster response times
* Smooth UI rendering
* Reliable parallel data fetching

## ⚠️ Challenges & Solutions

### 🔑 Managing API Keys Securely
**Challenge:** Preventing crashes when API keys are missing in production.
**Solution:**
* Used `.env` variables.
* Added runtime checks to block API calls if keys are unavailable.

### 🚦 API Rate Limiting
**Challenge:** Excessive API calls for repeated searches.
**Solution:**
* Implemented **memoization** in the Redux store.
* Prevented re-fetching the same movie data during a single session.

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/netflix-gpt.git
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory:
```env
VITE_TMDB_KEY=your_tmdb_key
VITE_GEMINI_API_KEY=your_gemini_key
```

### 4️⃣ Run the Application
```bash
npm run dev
```

## 📌 Final Notes

Netflix-GPT demonstrates:
* Real-world AI integration
* Clean Redux architecture
* Scalable frontend design
* Secure API handling

Perfect for showcasing **modern frontend + AI engineering skills** 🚀

---

# Manas-IILM
Academic project repository for submission and evaluation.
