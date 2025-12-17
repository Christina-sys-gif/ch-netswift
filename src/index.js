import React from 'react';
import ReactDOM from 'react-dom/client';
import { DarkModeProvider } from './contexts/DarkModeContext';
import './i18n'; // ← add this
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     <ThemeProvider>
    <App />
  </ThemeProvider>);

//The code ThemeProvider was replaced with DarkModeProvider in the above code.