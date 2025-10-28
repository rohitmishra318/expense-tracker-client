import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import HomePage from './components/HomePage';
import AuthContainer from './components/Auth/AuthContainer';
import { isAuthenticated, getUser, logoutUser, verifyToken } from './services/authService';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';
import Summary from './components/Summary';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [loading, setLoading] = useState(true);

  // Check JWT token validity on app mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        if (isAuthenticated()) {
          // Verify token with backend
          const isValid = await verifyToken();
          
          if (isValid) {
            setIsLoggedIn(true);
            setCurrentUser(getUser());
            setCurrentPage('dashboard');
          } else {
            logoutUser();
            setIsLoggedIn(false);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        logoutUser();
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setCurrentUser(getUser());
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
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

  const renderContent = () => {
    if (!isLoggedIn) {
      if (currentPage === 'home') {
        return <HomePage />;
      } else {
        return <AuthContainer onAuthSuccess={handleAuthSuccess} />;
      }
    }

    // Dashboard content when logged in
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Welcome back, {currentUser?.name}! 👋
              </h1>
              <p className="text-gray-600 mt-2">Here's your expense overview for today</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 Add Expense</h2>
                <ExpenseForm />
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Spending Overview</h2>
                <ExpenseChart />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">📈 Summary</h2>
                <Summary />
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">💳 Recent Expenses</h2>
                <ExpenseList />
              </div>
            </div>
          </div>
        );

      case 'expenses':
        return (
          <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                📋 All Expenses
              </h1>
              <p className="text-gray-600 mt-2">View and manage all your expense records</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Expense</h3>
                  <ExpenseForm />
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <ExpenseList />
                </div>
              </div>
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                📊 Reports & Analytics
              </h1>
              <p className="text-gray-600 mt-2">Visualize your spending patterns and get insights</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">📈 Spending Chart</h2>
                <ExpenseChart />
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 Summary</h2>
                <Summary />
              </div>
            </div>

            <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">💡 Analytics Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl p-6 text-white">
                  <p className="text-sm opacity-90">Total Income</p>
                  <p className="text-3xl font-bold">₹1,50,000</p>
                  <p className="text-xs opacity-75 mt-2">This month</p>
                </div>
                <div className="bg-gradient-to-br from-red-400 to-pink-500 rounded-xl p-6 text-white">
                  <p className="text-sm opacity-90">Total Expenses</p>
                  <p className="text-3xl font-bold">₹75,000</p>
                  <p className="text-xs opacity-75 mt-2">This month</p>
                </div>
                <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl p-6 text-white">
                  <p className="text-sm opacity-90">Balance</p>
                  <p className="text-3xl font-bold">₹75,000</p>
                  <p className="text-xs opacity-75 mt-2">Remaining</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                👤 Profile Settings
              </h1>
              <p className="text-gray-600 mt-2">Manage your account and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                  <div className="bg-gradient-to-br from-purple-400 to-blue-500 rounded-full w-32 h-32 flex items-center justify-center text-5xl mx-auto mb-4">
                    👤
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentUser?.name}</h2>
                  <p className="text-gray-600 mt-1">{currentUser?.email}</p>
                  <button className="mt-4 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                    Edit Profile
                  </button>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Account Information</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Full Name</p>
                        <p className="text-lg font-semibold text-gray-900">{currentUser?.name}</p>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Email Address</p>
                        <p className="text-lg font-semibold text-gray-900">{currentUser?.email}</p>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Member Since</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {new Date().toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Total Expenses Tracked</p>
                        <p className="text-lg font-semibold text-gray-900">₹1,25,000</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Security Settings</h3>
                    <button className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Change Password
                    </button>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Preferences</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
                        <span className="text-gray-700">Email notifications for new expenses</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
                        <span className="text-gray-700">Monthly expense report</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <input type="checkbox" className="w-5 h-5 rounded" />
                        <span className="text-gray-700">Budget alerts</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      {/* ✅ NAVBAR - ALWAYS SHOWN */}
      <Navbar 
        onLogout={handleLogout}
        currentPage={currentPage}
        onNavigate={handleNavigation}
      />

      {/* ✅ MAIN CONTENT - ONLY THIS CHANGES */}
      <main className="flex-grow w-full">
        {renderContent()}
      </main>
      
      {/* ✅ FOOTER - ALWAYS SHOWN */}
      <Footer />
    </div>
  );
}

export default App;
