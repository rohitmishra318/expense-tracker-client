// src/components/Home.jsx
// Make sure this file is named .jsx!

import React, { useEffect, useState } from 'react';
import Footer from "./Footer";
import heroImage from '../assets/homepage.png';
import { motion } from 'framer-motion';
import {
  Lock,
  BarChart3,
  CreditCard,
  ArrowRightLeft,
  Search,
  Zap,
  CheckCircle,
  ArrowRight,
  UserPlus,
} from 'lucide-react';
import { getToken } from '../services/auth';

// 1. Updated features array with Lucide icons
const features = [
  {
    icon: <Lock size={28} />,
    title: 'Secure Login & Signup',
    description: 'JWT-based authentication keeps your data safe and private.'
  },
  {
    icon: <BarChart3 size={28} />,
    title: 'Visual Dashboard & Charts',
    description: 'Instantly see where your money goes with interactive analytics.'
  },
  {
    icon: <CreditCard size={28} />,
    title: 'Track Expenses',
    description: 'Add, edit, delete, and categorize all of your transactions.'
  },
  {
    icon: <ArrowRightLeft size={28} />,
    title: 'Money Lend/Borrow',
    description: 'Keep tabs on money exchanged with friends & contacts.'
  },
  {
    icon: <Search size={28} />,
    title: 'Powerful Filters',
    description: 'Search your expenses by date, category, amount, and more.'
  },
  {
    icon: <Zap size={28} />,
    title: 'Fast & Responsive UI',
    description: 'Enjoy a seamless interface on both mobile and desktop.'
  }
];

const whyPoints = [
  'Stay in control of your personal or shared finances.',
  'Visualize spending habits and spot opportunities to save.',
  'Quickly settle debts with friends and track repayments.',
  'Access your data anywhere – always private and secure.'
];

// Reusable animation for sections
const sectionAnimation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 }
};

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());

  useEffect(() => {
    const onStorage = () => setIsLoggedIn(!!getToken());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    // Set dark:bg-zinc-900 to match the screenshot's dark background
    <div className="w-full overflow-hidden dark:bg-zinc-900">
    
      {/* 1. HERO SECTION - Updated to match the screenshot */}
      <motion.section 
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center"
        // This calculates the height to be 100vh minus a standard navbar height (e.g., 80px)
        // Adjust 80px if your navbar is taller or shorter.
        style={{ minHeight: 'calc(100vh - 80px)' }} 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-12 w-full">
          
          {/* 2. Hero Text Content - Updated to match screenshot */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              <span className="block text-3xl lg:text-4xl text-zinc-400 dark:text-zinc-300 font-medium mb-2">Welcome to</span>
              {/* This gradient matches the screenshot's header */}
              <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                ExpenseTracker
              </span>
            </h1>
            <p className="mt-4 mb-8 text-xl text-zinc-600 dark:text-zinc-300">
              Manage. Analyze. Grow.
            </p>
            
            {/* 3. Aesthetic Buttons - Updated to match screenshot */}
            <div className="flex justify-center md:justify-start gap-4">
              <a 
                href="/register" 
                // Updated gradient, rounded-md, and padding
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2.5 rounded-md shadow-lg transition transform hover:-translate-y-1 hover:shadow-xl font-semibold text-base"
              >
                Get Started
                <ArrowRight size={20} />
              </a>
              { !getToken() && (
                <a 
                  href="/login" 
                  // Updated to a white outline button
                  className="inline-flex items-center gap-2 bg-transparent text-white px-5 py-2.5 rounded-md border border-white hover:bg-white hover:text-zinc-900 transition-colors font-semibold text-base"
                >
                  Login
                </a>
              )}
            </div>
          </div>

          {/* 4. Hero Image - NEW ILLUSTRATION to match the style */}
         {/* 4. Hero Image - Now using your local asset */}
<div className="md:w-1/2 mt-8 md:mt-0">
  <img 
    src={heroImage}
    alt="Expense tracker hero illustration"
    className="w-full h-full"
  />
</div>
        </div>
      </motion.section>
      
      {/* 5. FEATURES SECTION */}
      <motion.section 
        {...sectionAnimation}
        className="py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent inline-block">
            Key Features
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-12 max-w-2xl mx-auto">
            Everything you need to take control of your finances, all in one place.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {features.map((feature) => (
              <motion.div 
                key={feature.title} 
                className="bg-white dark:bg-zinc-800/50 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 transition-all hover:border-indigo-400 dark:hover:border-cyan-400 hover:shadow-xl"
                whileHover={{ y: -5 }}
              >
                <div className="text-indigo-500 dark:text-cyan-400 mb-4 inline-block">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-zinc-800 dark:text-zinc-100 text-xl mb-2">{feature.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-300">{feature.description}</p>
              </motion.div>
            ))}
            
          </div>
        </div>
      </motion.section>
      
      {/* 6. Combined Why/What Section */}
      <motion.section 
        {...sectionAnimation}
        className="py-24"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-5 text-zinc-900 dark:text-white">Why ExpenseTracker?</h2>
            <ul className="space-y-4">
              {whyPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-lg text-zinc-700 dark:text-zinc-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:w-1/2 bg-zinc-50 dark:bg-zinc-800/60 p-8 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <h2 className="text-3xl font-bold mb-3 text-zinc-900 dark:text-white">
                What is it?
              </h2>
              <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                ExpenseTracker is a secure, user-friendly app built for anyone who wants a beautiful overview of their finances.
              </p>
              <p className="text-lg text-zinc-700 dark:text-zinc-300">
                It's built with the MERN stack and TailwindCSS to give you speed, reliability, and a stunning interface.
              </p>
          </div>

        </div>
      </motion.section>

      {/* 7. Final Call to Action */}
      <motion.section 
        {...sectionAnimation}
        className="mt-8 mb-16 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <a 
          href="/register" 
          className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white py-4 px-10 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition transform hover:scale-105"
        >
          <UserPlus size={22} />
          Create Your Free Account
        </a>
      </motion.section>

      {/* 8. Footer */}
      <Footer />
    </div>
  );
}