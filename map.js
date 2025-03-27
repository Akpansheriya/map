const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware to enable CORS
app.use(cors());

// Google API key (store it in environment variables in production)
const googleApiKey = "AIzaSyAv9hVGQ1OG_3tJBwgetajNqOqMyD_orH4";

// Proxy route for fetching place search results
app.get("/api/search-places", async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      {
        params: {
          key: googleApiKey,
          query: query,
        },
      }
    );

    const places = response.data.results;
    res.status(200).json(places);
  } catch (error) {
    console.error("Error fetching places:", error);
    res.status(500).json({ error: "Failed to fetch places" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
