// src/components/Home.jsx
// Make sure this file is named .jsx!

import React from 'react';
import Footer from "./Footer";
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
  return (
    <div className="w-full overflow-hidden">
    
      {/* 2. Hero Section */}
      <motion.section 
        {...sectionAnimation}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Hero Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            {/* 3. Gradient Header Text */}
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight text-zinc-900 dark:text-white">
              Welcome to <span className="bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">ExpenseTracker</span>
            </h1>
            {/* 4. Dark mode text color */}
            <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-300">
              A modern app to help you <span className="text-indigo-500 dark:text-indigo-400 font-semibold">manage spending</span>, <span className="text-blue-500 dark:text-blue-400 font-semibold">analyze charts</span>, and <span className="text-green-600 dark:text-green-400 font-semibold">settle debts</span>.
            </p>
            {/* 5. Aesthetic Buttons */}
            <div className="flex justify-center md:justify-start gap-4">
              <a 
                href="/register" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg transition transform hover:-translate-y-1 hover:shadow-xl font-semibold text-lg"
              >
                Get Started
                <ArrowRight size={20} />
              </a>
              <a 
                href="/login" 
                className="inline-flex items-center gap-2 bg-transparent text-zinc-700 dark:text-zinc-200 px-6 py-3 rounded-full border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-semibold text-lg"
        _     >
                Login
              </a>
            </div>
          </div>

          {/* Hero Image with Glow */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Expense Tracker Dashboard"
              className="rounded-xl shadow-2xl dark:shadow-xl dark:shadow-indigo-500/20 object-cover w-full h-full"
              onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/6366f1/white?text=Tracker'}
            />
          </div>
        </div>
      </motion.section>
      
      {/* 6. Features Section (Cards) */}
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
              // 7. Modernized Card
              <motion.div 
                key={feature.title} 
                className="bg-white dark:bg-zinc-800/50 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 transition-all hover:border-indigo-400 dark:hover:border-cyan-400 hover:shadow-xl"
                whileHover={{ y: -5 }}
              >
                {/* 8. Lucide Icon */}
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
      
      {/* 9. Combined Why/What Section */}
      <motion.section 
        {...sectionAnimation}
        className="py-24"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          
          {/* Why Section */}
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

          {/* What Section */}
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

      {/* 10. Final Call to Action */}
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

      {/* 11. Footer */}
      <Footer />
    </div>
  );
}