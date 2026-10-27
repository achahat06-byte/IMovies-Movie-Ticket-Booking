
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Movie database structure
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  language: { type: String, required: true },
  rating: { type: Number, default: 0 },
  duration: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  description: { type: String, required: true },
  posterUrl: { type: String, default: "" }
});

const Movie = mongoose.model("Movie", movieSchema);

// Starter movie collection
const starterMovies = [
  {
    title: "Jawan",
    genre: "Action",
    language: "Hindi",
    rating: 7.0,
    duration: "2h 49m",
    releaseYear: 2023,
    description: "An action-packed story of a man fighting for justice."
  },
  {
    title: "Pathaan",
    genre: "Action",
    language: "Hindi",
    rating: 5.8,
    duration: "2h 26m",
    releaseYear: 2023,
    description: "An Indian spy takes on a dangerous mission."
  },
  {
    title: "3 Idiots",
    genre: "Comedy",
    language: "Hindi",
    rating: 8.4,
    duration: "2h 50m",
    releaseYear: 2009,
    description: "Three friends challenge the pressures of the education system."
  },
  {
    title: "Dangal",
    genre: "Drama",
    language: "Hindi",
    rating: 8.3,
    duration: "2h 41m",
    releaseYear: 2016,
    description: "A wrestler trains his daughters to become champions."
  },
  {
    title: "Chhaava",
    genre: "Action",
    language: "Hindi",
    rating: 7.0,
    duration: "2h 41m",
    releaseYear: 2025,
    description: "A historical drama about courage and leadership."
  },
  {
    title: "Inception",
    genre: "Sci-Fi",
    language: "English",
    rating: 8.8,
    duration: "2h 28m",
    releaseYear: 2010,
    description: "A skilled thief enters people's dreams to steal secrets."
  },
  {
    title: "Interstellar",
    genre: "Sci-Fi",
    language: "English",
    rating: 8.7,
    duration: "2h 49m",
    releaseYear: 2014,
    description: "Explorers travel through space searching for humanity's future."
  },
  {
    title: "The Dark Knight",
    genre: "Action",
    language: "English",
    rating: 9.0,
    duration: "2h 32m",
    releaseYear: 2008,
    description: "Batman faces a dangerous criminal who threatens Gotham."
  },
  {
    title: "Avengers: Endgame",
    genre: "Action",
    language: "English",
    rating: 8.4,
    duration: "3h 1m",
    releaseYear: 2019,
    description: "The Avengers unite for a final battle to restore the universe."
  },
  {
    title: "Inside Out 2",
    genre: "Animation",
    language: "English",
    rating: 7.5,
    duration: "1h 36m",
    releaseYear: 2024,
    description: "New emotions arrive as Riley navigates her teenage years."
  }
];

// Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the IMovies API!",
    status: "running"
  });
});

// Backend health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "IMovies backend is working"
  });
});

// Database health check
app.get("/api/db-health", (req, res) => {
  const connected = mongoose.connection.readyState === 1;

  res.status(connected ? 200 : 503).json({
    success: connected,
    database: connected ? "connected" : "not connected"
  });
});

// Get movies, with optional search and genre filters
app.get("/api/movies", async (req, res) => {
  try {
    const filter = {};

    if (req.query.search) {
      filter.title = {
        $regex: req.query.search,
        $options: "i"
      };
    }

    if (req.query.genre) {
      filter.genre = {
        $regex: `^${req.query.genre}$`,
        $options: "i"
      };
    }

    const movies = await Movie.find(filter).sort({ title: 1 });

    res.json({
      success: true,
      count: movies.length,
      movies: movies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch movies"
    });
  }
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is missing");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000
    });

    console.log("Connected to MongoDB Atlas");

    // Add starter movies only if the collection is empty
    const movieCount = await Movie.countDocuments();

    if (movieCount === 0) {
      await Movie.insertMany(starterMovies);
      console.log("Starter movies added successfully");
    } else {
      console.log(`Database already contains ${movieCount} movies`);
    }

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`IMovies API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Backend startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
