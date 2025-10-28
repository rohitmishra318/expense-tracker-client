import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import AppRoutes from "./routes/AppRoutes";
import { isAuthenticated, getUser, logoutUser, verifyToken } from "./services/authService";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        if (isAuthenticated()) {
          const isValid = await verifyToken();
          if (isValid) {
            setIsLoggedIn(true);
            setCurrentUser(getUser());
            setCurrentPage("dashboard");
          } else {
            logoutUser();
            setIsLoggedIn(false);
          }
        }
      } finally {
        setLoading(false);
      }
    }
    checkAuthStatus();
  }, []);

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setCurrentUser(getUser());
    setCurrentPage("dashboard");
  };

  if (loading) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-5xl mb-4">⏳</div>
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <Navbar
        onLogout={() => {
          logoutUser();
          setIsLoggedIn(false);
          setCurrentUser(null);
          setCurrentPage("home");
        }}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      <main className="flex-grow w-full">
        <AppRoutes
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          currentPage={currentPage}
          onAuthSuccess={handleAuthSuccess}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
