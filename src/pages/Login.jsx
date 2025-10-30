// src/pages/Login.jsx

import { useState } from 'react';
import { post, AUTH_API } from '../services/api';
import { saveToken } from '../services/auth';
import { motion } from 'framer-motion'; // 1. Import motion
import { Lock, LogIn, AlertCircle, CheckCircle } from 'lucide-react'; // 2. Import Lucide icons

export default function Login() {
  const [form, setForm] = useState({ emailOrUsername: '', password: '' });
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
      const result = await post(`${AUTH_API}/login`, form);
      
      if (result.token) {
        saveToken(result.token);
        if (result.user) localStorage.setItem('currentUser', JSON.stringify(result.user));
        setMessageType('success');
        setMessage('Login successful! Redirecting...');
        setTimeout(() => (window.location.href = '/'), 900);
      } else {
        setMessage(result.error || 'Login failed.');
      }
    } catch (err) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 3. Full-screen container with dark mode background
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-zinc-900 px-4 py-12">
      
      {/* 4. Animated card with dark mode styling */}
      <motion.div 
        className="max-w-md w-full bg-white dark:bg-zinc-800 rounded-2xl shadow-xl dark:border dark:border-zinc-700 p-8 md:p-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 rounded-full p-3 mb-4">
            {/* 5. Replaced SVG with Lucide icon */}
            <Lock className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-zinc-300">
            Or{' '}
            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              create a new account
            </a>
          </p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email/Username Input */}
          <div>
            <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-700 dark:text-zinc-200">
              Email or Username
            </label>
            <div className="mt-1 relative">
              <input 
                id="emailOrUsername"
                name="emailOrUsername" 
                type="text" 
                required 
                placeholder="you@example.com"
                value={form.emailOrUsername} 
                onChange={handleChange} 
                // 6. Styled input for dark mode
                className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-zinc-400 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 sm:text-sm" 
              />
            </div>
          </div>
          
          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-zinc-200">
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
                // 6. Styled input for dark mode
                className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-zinc-400 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 sm:text-sm" 
              />
            </div>
          </div>
          
          {/* Submit Button */}
          <div>
            <button 
              type="submit" 
              disabled={isLoading}
              // 7. Styled button with icon and dark mode
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed transition"
            >
              {isLoading ? 'Signing in...' : (
                <>
                  <LogIn size={18} /> Sign in
                </>
              )}
            </button>
          </div>
        </form>
        
        {/* 8. Aesthetic Message Area */}
        {message && (
          <div className={`mt-6 flex items-center justify-center gap-2 text-sm ${
            messageType === 'error' 
            ? 'text-red-600 dark:text-red-400' 
            : 'text-green-600 dark:text-green-400'
          }`}>
            {messageType === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
            <span>{message}</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}