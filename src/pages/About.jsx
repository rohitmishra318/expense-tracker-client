import React from 'react';

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

export default function About() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full bg-indigo-600 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            About ExpenseTracker
          </h1>
          <p className="mt-4 text-xl text-indigo-100 max-w-3xl mx-auto">
            Our mission is to help you manage your money, analyze expenses, and track debts, all in one simple, beautiful platform.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-lg text-gray-700 space-y-4 text-left">
          <h2 className="text-3xl font-bold mb-6 text-center text-indigo-800">Our Story</h2>
          <p className="max-w-3xl mx-auto text-center">
            This project was born as a MERN stack intern assignment. The goal was to build a complete, real-world application that solves a common problem: financial clarity. We focused on creating a tool that not only functions perfectly but also motivates better budgeting and promotes healthy, transparent financial sharing among friends.
          </p>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-green-800">Core Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow">
                {/* SVG Checkmark Icon */}
                <svg className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span className="text-lg text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      
      {/* Technology Stack Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">Our Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech) => (
              <div key={tech.name} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-all hover:shadow-xl hover:scale-105">
                <h3 className="font-semibold text-indigo-700 text-xl mb-2">{tech.name}</h3>
                <p className="text-gray-600">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action / Thank you */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Thanks for using ExpenseTracker!
          </h2>
          <p className="mt-3 text-lg text-gray-600">We hope it helps you achieve your financial goals.</p>
          <a 
            href="/register" 
            className="mt-8 inline-flex items-center justify-center gap-3 bg-indigo-600 text-white py-3 px-8 rounded-full text-lg font-bold shadow-lg hover:bg-indigo-700 transition transform hover:scale-105"
          >
            Get Started
            {/* Simple SVG Arrow */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </section>
    </div>
  );
}
