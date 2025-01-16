import { useState, useEffect } from 'react';
import EverythingCard from './EverythingCard';
import Loader from './Loader';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function AllNews() {
  const { t } = useTranslation(); // Initialize translation hook
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('es'); // Default target language

  const pageSize = 12; // Number of articles per page

  // Translate text function
  const translateText = async (text, targetLanguage) => {
    try {
      const response = await axios.post('https://libretranslate.com/translate', {
        q: text,
        source: 'en', // Assuming the original text is in English
        target: targetLanguage,
        format: 'text',
      });
      return response.data.translatedText;
    } catch (error) {
      console.error('Error translating text:', error);
      return text; // Return the original text if translation fails
    }
  };

  // Fetching news data based on the current page and language
  useEffect(() => {
    const fetchNewsData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:3000/all-news?page=${page}&pageSize=${pageSize}`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const myJson = await response.json();
        if (myJson.success) {
          setTotalResults(myJson.data.totalResults);

          // Translate descriptions if needed
          const translatedArticles = await Promise.all(
            myJson.data.articles.map(async (article) => {
              const translatedDescription = await translateText(article.description, language);
              return { ...article, description: translatedDescription };
            })
          );

          setData(translatedArticles);
        } else {
          setError(myJson.message || 'An error occurred while fetching data.');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch news. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsData();
  }, [page, language]); // Re-fetch when the page or language changes

  // Handlers for pagination
  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < Math.ceil(totalResults / pageSize)) setPage(page + 1);
  };

  return (
    <>
      {/* Error message */}
      {error && <div className="text-red-500 mb-4">{t('errorMessage', { defaultValue: error })}</div>}

      {/* News articles grid */}
      <div className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3">
        {!isLoading
          ? data.map((element, index) => (
              <EverythingCard
                title={element.title}
                description={element.description}
                imgUrl={element.urlToImage}
                publishedAt={element.publishedAt}
                url={element.url}
                author={element.author}
                source={element.source.name}
                key={index}
              />
            ))
          : <Loader />
        }
      </div>

      {/* Pagination controls */}
      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button
            disabled={page <= 1}
            className="pagination-btn text-center"
            onClick={handlePrev}
          >
            &larr; {t('prevButton')}
          </button>
          <p className="font-semibold opacity-80">{page} {t('ofText')} {Math.ceil(totalResults / pageSize)}</p>
          <button
            className="pagination-btn text-center"
            disabled={page >= Math.ceil(totalResults / pageSize)}
            onClick={handleNext}
          >
            {t('nextButton')} &rarr;
          </button>
        </div>
      )}
    </>
  );
}

export default AllNews;
