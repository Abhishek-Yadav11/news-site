const axios = require("axios");

// Fetch news from an external API
const getNews = async (req, res) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        country: "us",
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch news" });
  }
};

module.exports = { getNews };
