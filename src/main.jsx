// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { DarkModeProvider } from './contexts/DarkModeContext';
import './i18n';
import './index.css';
import App from './App';

// Wait for DOM to be ready
if (typeof window !== 'undefined') {
  createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </React.StrictMode>
);
}