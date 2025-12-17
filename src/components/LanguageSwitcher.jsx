// src/components/LanguageSwitcher.jsx
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import CountryFlag from 'react-country-flag';

// Define languages with full names and country codes
const languages = {
  'en-US': { name: 'English', countryCode: 'US' },
  'fr-FR': { name: 'Français', countryCode: 'FR' },
  'es-ES': { name: 'Español', countryCode: 'ES' },
};

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    setIsOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const currentLang = languages[i18n.language] || languages['en-US'];

  return (
    <div className="relative inline-block">
      {/* Current selection button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md 
                   bg-gray-200 dark:bg-gray-700 
                   hover:bg-gray-300 dark:hover:bg-gray-600 
                   transition text-sm font-medium
                   text-gray-800 dark:text-gray-200"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <CountryFlag
          countryCode={currentLang.countryCode}
          svg
          style={{ width: '1.4em', height: '1.4em' }}
        />
        <span>{currentLang.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 
                     rounded-lg shadow-lg z-10 border border-gray-200 dark:border-gray-700
                     py-1"
          onClick={(e) => e.stopPropagation()}
        >
          {Object.entries(languages).map(([code, lang]) => (
            <button
              key={code}
              onClick={() => changeLanguage(code)}
              className={`w-full flex items-center gap-3 px-3 py-1.5 text-sm 
                         transition text-gray-700 dark:text-gray-300
                         ${i18n.language === code
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <CountryFlag
                countryCode={lang.countryCode}
                svg
                style={{ width: '1.4em', height: '1.4em' }}
              />
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}