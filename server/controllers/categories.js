const axios = require("axios");

const getNewsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        country: "us",
        category,
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch category news" });
  }
};

module.exports = { getNewsByCategory };
