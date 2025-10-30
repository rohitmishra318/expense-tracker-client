// File renamed to About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react'; // 1. Import icons
import Footer from './Footer';

// Tech stack items
const techStack = [
  { name: 'MongoDB', description: 'Database for storing all user and transaction data securely.' },
  { name: 'Express.js', description: 'Backend framework for building robust and scalable APIs.' },
  { name: 'React.js', description: 'Frontend library for a fast, interactive, and responsive user interface.' },
  { name: 'Node.js', description: 'Runtime environment that powers our fast and efficient backend.' },
  { name: 'TailwindCSS', description: 'Utility-first CSS framework for rapid, modern, and beautiful styling.' },
  { name: 'JWT', description: 'Used for secure, token-based user authentication.' },
];

// Core features
const coreFeatures = [
  'Secure user authentication',
  'Full CRUD operations for expenses',
  'Interactive analytics dashboard',
  'Money lending/borrowing tracker',
  'Powerful filtering and search',
  'Fully responsive mobile-first design'
];

// 2. Reusable animation for sections
const sectionAnimation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 }
};

export default function About() {
  return (
    <div className="w-full overflow-hidden">
      {/* 3. Hero Section - Modernized with a gradient */}
      <section className="w-full bg-gradient-to-br from-indigo-600 to-blue-500 dark:from-indigo-800 dark:to-blue-700 py-20">
        <motion.div 
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            About ExpenseTracker
          </h1>
          <p className="mt-4 text-xl text-indigo-100 max-w-3xl mx-auto">
            Our mission is to help you manage money, analyze expenses, and track debts, all in one simple, beautiful platform.
          </p>
        </motion.div>
      </section>

      {/* 4. Our Story Section - Integrated into main flow */}
      <motion.section 
        {...sectionAnimation}
        className="py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-lg text-zinc-700 dark:text-zinc-300 space-y-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white">
            Our Story
          </h2>
          <p className="max-w-3xl mx-auto">
            This project was born as a MERN stack intern assignment. The goal was to build a complete, real-world application that solves a common problem: financial clarity. We focused on creating a tool that not only functions perfectly but also motivates better budgeting and promotes healthy, transparent financial sharing among friends.
          </p>
        </div>
      </motion.section>

      {/* 5. Core Features Section - Removed bg-green-50, updated icons */}
      <motion.section 
        {...sectionAnimation}
        className="py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent inline-block">
            Core Features
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-3 p-4 bg-white dark:bg-zinc-800/50 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700">
                {/* 6. Replaced SVG with Lucide icon */}
                <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mt-1 flex-shrink-0" />
                <span className="text-lg text-zinc-700 dark:text-zinc-200">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>
      
      {/* 7. Technology Stack Section - Modernized cards (like Home.jsx) */}
      <motion.section 
        {...sectionAnimation}
        className="py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-500 to-blue-400 bg-clip-text text-transparent inline-block">
            Our Technology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech) => (
              <motion.div 
                key={tech.name} 
                className="bg-white dark:bg-zinc-800/50 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 transition-all hover:border-indigo-400 dark:hover:border-blue-400 hover:shadow-xl"
                whileHover={{ y: -5 }}
              >
s                <h3 className="font-semibold text-indigo-600 dark:text-indigo-400 text-xl mb-2">{tech.name}</h3>
                <p className="text-zinc-600 dark:text-zinc-300">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
    	</motion.section>

      {/* 8. Final Call to Action - Removed bg-gray-50, updated button */}
D      <motion.section 
        {...sectionAnimation}
        className="py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
Next         <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Thanks for using ExpenseTracker!
          </h2>
          <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-300">
            We hope it helps you achieve your financial goals.
          </p>
          {/* 9. Updated button to match Home.jsx */}
          <a 
            href="/register" 
            className="mt-8 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white py-3 px-8 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            Get Started
            <ArrowRight size={20} />
          </a>
        </div>
      </motion.section>
  
      <Footer />
    </div>
  );
}