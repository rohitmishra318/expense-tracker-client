import { useState } from 'react';

function HomePage({ onLogin, showLoginForm, setShowLoginForm }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const features = [
    {
      title: "Expense Tracking",
      description: "Keep track of all your expenses in one place with easy-to-use input forms.",
      icon: "📝",
      color: "from-pink-400 to-rose-500"
    },
    {
      title: "Visual Analytics",
      description: "View your spending patterns through interactive charts and graphs.",
      icon: "📊",
      color: "from-blue-400 to-cyan-500"
    },
    {
      title: "Category Management",
      description: "Organize expenses by categories to better understand your spending habits.",
      icon: "🏷️",
      color: "from-green-400 to-emerald-500"
    },
    {
      title: "Summary Reports",
      description: "Get detailed summaries of your expenses with filtering options.",
      icon: "📋",
      color: "from-purple-400 to-indigo-500"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.email && credentials.password) {
      onLogin();
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden w-full">
  <div className="w-full px-4 sm:px-6 lg:px-8 py-20">
    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
      {/* Left Content */}
      <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  ✨ Smart Money Management
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                Take Control of Your
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Finances</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Track expenses, visualize spending patterns, and make informed financial decisions 
                with our powerful and intuitive expense tracking platform.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowLoginForm(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Get Started Free →
                </button>
                <button className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-bold border-2 border-purple-600 hover:bg-purple-50 transition-all duration-300">
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8">
                <div>
                  <p className="text-3xl font-bold text-purple-600">10K+</p>
                  <p className="text-gray-600">Active Users</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">₹50Cr+</p>
                  <p className="text-gray-600">Tracked</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600">4.8★</p>
                  <p className="text-gray-600">Rating</p>
                </div>
              </div>
            </div>

            {/* Right Content - Illustration */}
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-400 to-blue-500 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Monthly Summary</h3>
                    <span className="text-2xl">💳</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-green-700 font-semibold">Income</span>
                      <span className="text-green-700 font-bold">₹50,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-red-700 font-semibold">Expenses</span>
                      <span className="text-red-700 font-bold">₹32,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-blue-700 font-semibold">Balance</span>
                      <span className="text-blue-700 font-bold">₹18,000</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-4 shadow-lg animate-bounce">
                <span className="text-3xl">💰</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-pink-400 rounded-full p-4 shadow-lg animate-pulse">
                <span className="text-3xl">📊</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for 
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Smart Tracking</span>
            </h2>
            <p className="text-xl text-gray-600">Everything you need to manage your expenses efficiently</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-100 hover:border-transparent"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                
                <div className="relative">
                  <div className={`inline-block bg-gradient-to-br ${feature.color} rounded-2xl p-4 mb-4 shadow-lg`}>
                    <span className="text-4xl">{feature.icon}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-purple-100 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Expense Tracker?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🔒</span>
              </div>
              <h4 className="font-bold text-xl mb-3 text-gray-900">Secure & Private</h4>
              <p className="text-gray-600">Your financial data is encrypted and protected with bank-level security</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">⚡</span>
              </div>
              <h4 className="font-bold text-xl mb-3 text-gray-900">Fast & Easy</h4>
              <p className="text-gray-600">Add expenses in seconds with our intuitive and user-friendly interface</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📱</span>
              </div>
              <h4 className="font-bold text-xl mb-3 text-gray-900">Responsive Design</h4>
              <p className="text-gray-600">Access your data anywhere, on any device - mobile, tablet, or desktop</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who are already managing their expenses smarter
          </p>
          <button
            onClick={() => setShowLoginForm(true)}
            className="bg-white text-purple-600 px-10 py-4 rounded-full text-xl font-bold hover:bg-yellow-300 hover:text-purple-700 transition-all duration-300 shadow-2xl transform hover:scale-105"
          >
            Start Tracking Now - It's Free! 🚀
          </button>
        </div>
      </section>

      {/* Login Modal */}
      {showLoginForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">Welcome Back!</h2>
                <button
                  onClick={() => setShowLoginForm(false)}
                  className="text-white hover:text-yellow-300 text-3xl transition-colors"
                >
                  ×
                </button>
              </div>
              <p className="text-blue-100 mt-2">Login to manage your expenses</p>
            </div>
            
            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  📧 Email Address
                </label>
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  🔒 Password
                </label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Login Now →
              </button>
            </form>

            <div className="px-8 pb-8 text-center">
  <p className="text-gray-600">
    Don't have an account? 
    <button
      className="text-purple-600 font-bold ml-1 hover:underline"
      onClick={() => {
        setShowLoginForm(false);    // Hide login modal
        if (typeof onSignUpClick === 'function') onSignUpClick();
      }}
    >
      Sign Up Free
    </button>
  </p>
</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
