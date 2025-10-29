import { useState } from 'react';
import { post, AUTH_API } from '../services/api'; // Using your original imports

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageType, setMessageType] = useState('error'); // 'error' or 'success'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);
    setMessageType('error');

    try {
      const result = await post(`${AUTH_API}/register`, form);
      
      if (result.token) {
        localStorage.setItem('token', result.token);
        setMessageType('success');
        setMessage('Registration successful! Redirecting...');
        // Add a redirect here, e.g.:
        // setTimeout(() => window.location.href = '/dashboard', 1500);
      } else {
        setMessage(result.error || 'Registration failed.');
      }
    } catch (err) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Full-screen container to center the login box
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 md:p-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-indigo-100 rounded-full p-3 mb-4">
            {/* User Plus Icon SVG */}
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in to your account
            </a>
          </p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="mt-1 relative">
              <input 
                id="username"
                name="username" 
                type="text" 
                required 
                placeholder="your_username"
                value={form.username} 
                onChange={handleChange} 
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              />
            </div>
          </div>
          
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1 relative">
              <input 
                id="email"
                name="email" 
                type="email" 
                required 
                placeholder="you@example.com"
                value={form.email} 
                onChange={handleChange} 
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              />
            </div>
          </div>
          
          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <input 
                id="password"
                name="password" 
                type="password" 
                required 
                placeholder="••••••••"
                value={form.password} 
                onChange={handleChange} 
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              />
            </div>
          </div>
          
          {/* Submit Button */}
          <div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </div>
        </form>
        
        {/* Message Area */}
        {message && (
          <div className="mt-6 text-center">
            <p className={`text-sm ${messageType === 'error' ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
