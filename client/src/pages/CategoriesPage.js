import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import { fetchNewsByCategory } from "../services/api";

const CategoriesPage = () => {
  const { category } = useParams();
  const [news, setNews] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      const data = await fetchNewsByCategory(category);
      setNews(data.articles);
    };
    loadNews();
  }, [category]);

  return (
    <div className="categories-page">
      <h1>News in {category}</h1>
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

export default CategoriesPage;
