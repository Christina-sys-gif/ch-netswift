 // src/pages/Home.jsx
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api';

export default function Home() {
  const { t } = useTranslation();
  const [networks, setNetworks] = useState([]);

  useEffect(() => {
    api.get('/networks')
      .then(res => setNetworks(res.data))
      .catch(err => console.error('Failed to load networks:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* 💥 Bold, Eye-Catching Animated Network Background */}
  
<div 
  className="absolute inset-0 opacity-25 dark:opacity-30"
  style={{
    backgroundImage: `url('/images/netflow-bg.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  }}
/>

      {/* 🌟 Glowing Circle Behind Content */}
      <div 
        className="absolute inset-0 bg-gray-50/70 dark:bg-gray-900/70 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 80%)'
        }}
      />

      {/* 🛡️ Lighter Overlay for Better Background Visibility */}
      <div className="absolute inset-0 bg-gray-50/70 dark:bg-gray-900/70 pointer-events-none" />

      {/* ✅ Content */}
      <div className="max-w-md mx-auto py-12 px-6 relative z-10">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
          {t('welcome', 'Welcome to CH NETSWIFT ENTERPRISE')}
        </h1>

        <p className="text-xl text-center mb-8 text-gray-600 dark:text-gray-400">
          {t('selectNetwork', 'Select Your Network')}
        </p>

        <div className="flex flex-col gap-4 max-w-md mx-auto">
          {/* MTN Ghana */}
          <Link
            to="/packages/1"
            className="flex items-center gap-4 p-4 rounded-xl transition shadow-md hover:shadow-lg bg-white dark:bg-gray-800"
          >
            <img src="/images/MTN-logo.png" alt="MTN" className="w-10 h-10" />
            <span className="text-black dark:text-white font-bold text-lg">MTN Ghana</span>
          </Link>

          {/* AirtelTigo */}
          <Link
            to="/packages/2"
            className="flex items-center gap-4 p-4 rounded-xl transition shadow-md hover:shadow-lg bg-white dark:bg-gray-800"
          >
            <img src="/images/AirtelTigo-logo.png" alt="AirtelTigo" className="w-10 h-10" />
            <span className="text-black dark:text-white font-bold text-lg">AirtelTigo</span>
          </Link>

          {/* Telecel Ghana */}
          <Link
            to="/packages/3"
            className="flex items-center gap-4 p-4 rounded-xl transition shadow-md hover:shadow-lg bg-white dark:bg-gray-800"
          >
            <img src="/images/Telecel-logo.png" alt="Telecel" className="w-10 h-10" />
            <span className="text-black dark:text-white font-bold text-lg">Telecel Ghana</span>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/staff/login"
            className="inline-block px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {t('login', 'Staff Login')}
          </Link>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes networkMove {
          0% { background-position: 0 0, 0 0, 30px 30px; }
          100% { background-position: 60px 0, 0 60px, 110px 110px; }
        }
      `}</style>
    </div>
  );
}