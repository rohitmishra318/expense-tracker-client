// File renamed to Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin } from 'lucide-react'; // 1. Import icons

export default function Footer() {
  return (
    // 2. Added motion and dark: classes
    <motion.footer 
      className="bg-gray-50 dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8"> {/* Put max-w-6xl back */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Copyright Text */}
          <div className="text-center sm:text-left">
            {/* 3. Added dark: classes */}
            <p className="text-sm text-gray-700 dark:text-zinc-200 font-semibold">
              © {new Date().getFullYear()} ExpenseTracker
            </p>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
              Manage your finances, beautifully.
            </p>
          </div>
          
          {/* Social Icons */}
          <div className="flex justify-center gap-6 mt-4 sm:mt-0">
            {/* 4. Replaced SVGs with Lucide icons and updated hover colors */}
            <a 
              href="#" 
              aria-label="GitHub"
              className="text-gray-400 dark:text-zinc-500 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors"
            >
              <Github size={24} />
            </a>
            <a 
              href="#" 
              aria-label="Twitter"
              className="text-gray-400 dark:text-zinc-500 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors"
            >
              <Twitter size={24} />
            </a>
            <a 
              href="#" 
              aria-label="LinkedIn"
              className="text-gray-400 dark:text-zinc-500 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors"
            >
              <Linkedin size={24} />
            </a>
  ...     </div>
        </div>
      </div>
    </motion.footer>
  );
}