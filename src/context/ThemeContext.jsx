import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the Context
const ThemeContext = createContext();

// 2. Create the Provider (the component that will "wrap" your app)
export const ThemeProvider = ({ children }) => {
  // 3. Set up state
  // We check localStorage first, then default to 'dark' as you requested
  const [theme, setTheme] = useState(() => {
    const localTheme = window.localStorage.getItem('theme');
    return localTheme || 'dark';
  });

  // 4. Create the effect to update the <html> tag
  useEffect(() => {
    const root = window.document.documentElement; // This is the <html> tag

    // Remove the other class
    const oldTheme = theme === 'dark' ? 'light' : 'dark';
    root.classList.remove(oldTheme);
    
    // Add the new class
    root.classList.add(theme);

    // Save the preference to localStorage
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  // 5. Function to toggle the theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// 6. Create a custom hook to easily use the context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};