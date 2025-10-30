import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Your main CSS file
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx'; // 1. Import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 2. Wrap your app */}
    <ThemeProvider> 
      
        <App />
      
    </ThemeProvider>
  </React.StrictMode>
);