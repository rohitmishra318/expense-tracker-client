import { Link, useNavigate } from "react-router-dom";
import { getToken, logout } from "../services/auth";
import { useEffect, useState } from "react";
import { User } from "lucide-react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const navigate = useNavigate();

  useEffect(() => {
    // React to token change (e.g., login/logout)
    const handleStorageChange = () => {
      setIsLoggedIn(!!getToken());
    };

    window.addEventListener("storage", handleStorageChange);

    // Also trigger whenever component mounts
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
    <nav className="bg-indigo-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <Link
        to="/"
        className="font-extrabold text-2xl tracking-wide hover:text-cyan-300 transition-all"
      >
        ExpenseTracker
      </Link>

      <div className="flex items-center gap-5 text-base">
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

        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="bg-white text-indigo-600 font-medium px-4 py-1 rounded-full hover:bg-indigo-100 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="border border-white px-4 py-1 rounded-full hover:bg-indigo-500 transition"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-1 rounded-full font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
