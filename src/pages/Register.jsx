// src/pages/Register.jsx

import { useState } from 'react';
import { post, AUTH_API } from '../services/api';
import { saveToken } from '../services/auth'; // 1. Import saveToken for consistency
import { motion } from 'framer-motion';
import { UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import Footer from './Footer';

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
      
      if (result.message && result.message.includes("successful")) { // Check for success message from backend
        setMessageType('success');
        setMessage('Registration successful! Please login.');
        // Redirect to login after a short delay
        setTimeout(() => (window.location.href = '/login'), 1500);
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
    // 2. Full-screen container with dark mode background
    <div className="flex flex-col items-center min-h-screen bg-[#18191B] px-4 py-12">
      
      {/* 3. Animated card with dark mode styling */}
      <motion.div 
        className="max-w-md w-full bg-[#1E1F22] rounded-2xl shadow-xl border border-zinc-800 p-8 md:p-10 mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        
        {/* Header */}
        <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-indigo-900/50 rounded-full p-3 mb-4">
              {/* 4. Replaced SVG with Lucide icon */}
              <UserPlus className="w-8 h-8 text-indigo-400" />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-zinc-300">
            Or{' '}
            <a href="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
              sign in to your account
            </a>
          </p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-zinc-200">
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
                className="appearance-none block w-full px-4 py-3 border border-zinc-700 bg-zinc-800 text-white placeholder-zinc-400 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              />
            </div>
          </div>
          
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-zinc-200">
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
                className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-zinc-400 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 sm:text-sm" 
              />
            </div>
          </div>
          
          {/* Submit Button */}
          <div>
            <button 
              type="submit" 
              disabled={isLoading}
              // 6. Styled button with icon and dark mode
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed transition"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </div>
        </form>
        
        {/* 7. Aesthetic Message Area */}
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
      <Footer />
    </div>
  );
}