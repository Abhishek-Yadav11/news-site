import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchNews = async () => {
  try {
    const response = await axios.get(`${API_URL}/news`);
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return { articles: [] };
  }
};

export const fetchNewsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/categories/${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category news:", error);
    return { articles: [] };
  }
};
