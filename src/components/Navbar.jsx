import { Link, useNavigate } from "react-router-dom";
import { getToken, logout } from "../services/auth";
import { useEffect, useState } from "react";
import { User, Moon, Sun } from "lucide-react"; // 1. Import Moon and Sun
import { useTheme } from "../context/ThemeContext"; // 2. Import our theme hook

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const { theme, toggleTheme } = useTheme(); // 3. Use the theme hook
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!getToken());
    };
    window.addEventListener("storage", handleStorageChange);
    setIsLoggedIn(!!getToken());
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    // 4. Add dark: classes for the navbar background
    <nav className="bg-indigo-600 dark:bg-zinc-800 text-white px-6 py-3 flex justify-between items-center shadow-md dark:border-b dark:border-zinc-700">
      <Link
        to="/"
        className="font-extrabold text-2xl tracking-wide hover:text-cyan-300 transition-all"
      >
        ExpenseTracker
      </Link>

      <div className="flex items-center gap-5 text-base">
        {/* These links are fine, cyan looks good on both light and dark */}
        <Link to="/" className="hover:text-cyan-300 transition">
          Home
        </Link>
        <Link to="/about" className="hover:text-cyan-300 transition">
          About
        </Link>
        <Link to="/tracker" className="hover:text-cyan-300 transition">
          Dashboard
        </Link>
        <Link to="/lentborrow" className="hover:text-cyan-300 transition">
          Lent/Borrowed
        </Link>
        <Link
          to="/profile"
          className="hover:text-cyan-300 transition flex items-center gap-1"
        >
          <User size={18} /> Profile
        </Link>
        
        {/* 5. Add the Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-indigo-500 dark:hover:bg-zinc-700 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              // 6. Add dark: classes for buttons
              className="bg-white text-indigo-600 font-medium px-4 py-1 rounded-full hover:bg-indigo-100 transition dark:bg-zinc-100 dark:text-zinc-800 dark:hover:bg-zinc-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="border border-white px-4 py-1 rounded-full hover:bg-indigo-500 transition dark:border-zinc-300 dark:hover:bg-zinc-700"
            >
              Sign Up
          	</Link>
          </>
        ) : (
          // Logout button is red, which works well on both themes
          <button
            onClick={handleLogout}
            className="bg-black-500 px-4 py-1 rounded-full font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;