import React, { useState } from 'react';
import i18n from 'i18next'; // Import i18next

function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); // Set default language based on current i18n language

  const handleLanguageChange = (newLang) => {
    setSelectedLanguage(newLang); // Set the selected language
    i18n.changeLanguage(newLang); // Change the language in i18next
    console.log(`Language changed to: ${newLang}`);
  };

  return (
    <div className="language-switcher-container">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="language-switcher-button"
      >
        <span className="selected-lang">{selectedLanguage || "Language"}</span>
      </button>
      {isOpen && (
        <div className={`language-switcher-dropdown ${isOpen ? 'show' : ''}`}>
          <button 
            onClick={() => handleLanguageChange('en')} 
            className={`block ${selectedLanguage === 'en' ? 'selected' : ''}`}
          >
            English
          </button>
          <button 
            onClick={() => handleLanguageChange('es')} 
            className={`block ${selectedLanguage === 'es' ? 'selected' : ''}`}
          >
            Español
          </button>
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
