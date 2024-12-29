import React, { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";
import { fetchNews } from "../services/api";

const HomePage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      const data = await fetchNews();
      setNews(data.articles);
    };
    loadNews();
  }, []);

  return (
    <div className="home-page">
      <h1>Top News</h1>
      <div className="news-grid">
        {news.map((article, index) => (
          <NewsCard
            key={index}
            title={article.title}
            description={article.description}
            url={article.url}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
