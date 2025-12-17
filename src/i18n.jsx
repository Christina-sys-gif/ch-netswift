// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'; // ✅ Must import this
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(initReactI18next) // ✅ MUST include this line
  .init({
    supportedLngs: ['en-US', 'fr-FR', 'es-ES'],
    fallbackLng: 'en-US',
    interpolation: { escapeValue: false },
    backend: {
      loadPath: '/locales/{{lng}}.json'
    }
  });

export default i18n;