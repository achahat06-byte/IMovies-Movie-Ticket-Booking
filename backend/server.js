
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the IMovies API!",
    status: "running"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "IMovies backend is working"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`IMovies API running on port ${PORT}`);
});
