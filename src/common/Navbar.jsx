import { useState } from 'react';

function Navbar({ isLoggedIn, onLogout, currentPage, onNavigate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    handleNavigation('login');
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleNavigation(isLoggedIn ? 'dashboard' : 'home')}
          >
            <div className="bg-white rounded-full p-2 shadow-md">
              <span className="text-2xl">💰</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Expense Tracker</h1>
              <p className="text-xs text-blue-100 hidden sm:block">Manage Your Money</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {!isLoggedIn ? (
              <>
                <button 
                  onClick={() => handleNavigation('home')}
                  className={`font-semibold transition-colors duration-200 ${
                    currentPage === 'home' ? 'text-yellow-300' : 'text-white hover:text-yellow-300'
                  }`}
                >
                  Home
                </button>
                <a 
                  href="#features" 
                  className="text-white hover:text-yellow-300 font-semibold transition-colors duration-200"
                >
                  Features
                </a>
                <a 
                  href="#about" 
                  className="text-white hover:text-yellow-300 font-semibold transition-colors duration-200"
                >
                  About
                </a>
                <a 
                  href="#contact" 
                  className="text-white hover:text-yellow-300 font-semibold transition-colors duration-200"
                >
                  Contact
                </a>
                <button
                  onClick={handleLoginClick}
                  className="bg-white text-purple-600 px-6 py-2 rounded-full font-bold hover:bg-yellow-300 hover:text-purple-700 transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => handleNavigation('dashboard')}
                  className={`font-semibold transition-colors duration-200 ${
                    currentPage === 'dashboard' ? 'text-yellow-300' : 'text-white hover:text-yellow-300'
                  }`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => handleNavigation('expenses')}
                  className={`font-semibold transition-colors duration-200 ${
                    currentPage === 'expenses' ? 'text-yellow-300' : 'text-white hover:text-yellow-300'
                  }`}
                >
                  Expenses
                </button>
                <button 
                  onClick={() => handleNavigation('reports')}
                  className={`font-semibold transition-colors duration-200 ${
                    currentPage === 'reports' ? 'text-yellow-300' : 'text-white hover:text-yellow-300'
                  }`}
                >
                  Reports
                </button>
                <button 
                  onClick={() => handleNavigation('profile')}
                  className={`font-semibold transition-colors duration-200 ${
                    currentPage === 'profile' ? 'text-yellow-300' : 'text-white hover:text-yellow-300'
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={onLogout}
                  className="bg-red-500 text-white px-6 py-2 rounded-full font-bold hover:bg-red-600 transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center gap-2"
                >
                  <span>🚪</span>
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3 bg-gradient-to-b from-purple-600 to-blue-600 px-4">
            {!isLoggedIn ? (
              <>
                <button 
                  onClick={() => handleNavigation('home')}
                  className="block w-full text-left text-white hover:text-yellow-300 font-semibold py-3 px-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  🏠 Home
                </button>
                <a 
                  href="#features" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-white hover:text-yellow-300 font-semibold py-3 px-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  ✨ Features
                </a>
                <a 
                  href="#about" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-white hover:text-yellow-300 font-semibold py-3 px-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  ℹ️ About
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-white hover:text-yellow-300 font-semibold py-3 px-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  📧 Contact
                </a>
                <button
                  onClick={handleLoginClick}
                  className="w-full bg-white text-purple-600 px-6 py-3 rounded-full font-bold hover:bg-yellow-300 hover:text-purple-700 transition-all duration-300"
                >
                  🔐 Login
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => handleNavigation('dashboard')}
                  className="block w-full text-left text-white hover:text-yellow-300 font-semibold py-3 px-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  📊 Dashboard
                </button>
                <button 
                  onClick={() => handleNavigation('expenses')}
                  className="block w-full text-left text-white hover:text-yellow-300 font-semibold py-3 px-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  💳 Expenses
                </button>
                <button 
                  onClick={() => handleNavigation('reports')}
                  className="block w-full text-left text-white hover:text-yellow-300 font-semibold py-3 px-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  📈 Reports
                </button>
                <button 
                  onClick={() => handleNavigation('profile')}
                  className="block w-full text-left text-white hover:text-yellow-300 font-semibold py-3 px-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  👤 Profile
                </button>
                <div className="border-t border-blue-500 pt-3">
                  <button
                    onClick={onLogout}
                    className="w-full bg-red-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>🚪</span>
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
