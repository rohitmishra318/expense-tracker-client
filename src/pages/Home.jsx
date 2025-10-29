import React from 'react';
import Footer from "./Footer";

// Using emoji as icons to avoid import errors.
const features = [
  {
    icon: '🔒',
    title: 'Secure Login & Signup',
    description: 'JWT-based authentication keeps your data safe and private.'
  },
  {
    icon: '📊',
    title: 'Visual Dashboard & Charts',
    description: 'Instantly see where your money goes with interactive analytics.'
  },
  {
    icon: '💳',
    title: 'Track Expenses',
    description: 'Add, edit, delete, and categorize all of your transactions.'
  },
  {
    icon: '🤝',
    title: 'Money Lend/Borrow',
    description: 'Keep tabs on money exchanged with friends & contacts.'
  },
  {
    icon: '🔎',
    title: 'Powerful Filters',
    description: 'Search your expenses by date, category, amount, and more.'
  },
  {
    icon: '🚀',
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

export default function Home() {
  return (
    // Main container is now full-width.
    <div className="mt-10 mb-16 w-full">
    
      {/* Hero Section: Centered card */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-2xl shadow-xl p-8 md:p-12">
          
          {/* Hero Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 text-indigo-700 tracking-tight">
              Welcome to ExpenseTracker
            </h1>
            <p className="mb-6 text-lg text-gray-700">
              A modern app to help you <span className="text-indigo-600 font-semibold">manage spending</span>, <span className="text-blue-500 font-semibold">analyze with charts</span>, and <span className="text-green-600 font-semibold">settle debts</span>.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a 
                href="/register" 
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg transition hover:bg-indigo-700 font-semibold text-lg"
              >
                Get Started
                {/* Simple SVG Arrow */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a 
                href="/login" 
                className="inline-flex items-center gap-2 bg-gray-100 text-indigo-700 px-6 py-3 rounded-full border hover:bg-gray-200 font-semibold text-lg"
              >
                Login
                {/* Simple SVG Arrow */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Expense Tracker Dashboard"
              className="rounded-xl shadow-2xl object-cover w-full h-full"
              onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/6366f1/white?text=Tracker'}
            />
          </div>
        </div>
      </div>
      
      {/* Information Section: Full-width background, centered content */}
      <section className="mt-16 mb-12 bg-indigo-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <h2 className="text-3xl font-bold mb-3 text-indigo-800">
            What is ExpenseTracker?
          </h2>
          <p className="text-lg text-gray-700 mb-2">
            ExpenseTracker is a secure, user-friendly app built for anyone who wants a beautiful overview of their finances, better budgeting, and tracking all their transactions.
          </p>
          <p className="text-lg text-gray-700">
            It's built with the MERN stack and TailwindCSS to give you speed, reliability, and a stunning interface.
          </p>
        </div>
      </section>
      
      {/* Features Section (as Cards): Centered content */}
      <section className="mb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {features.map((feature) => (
              <div key={feature.title} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-all hover:shadow-xl hover:scale-105">
                <span className="text-4xl mb-4 block" role="img" aria-label={feature.title}>{feature.icon}</span>
                <h3 className="font-semibold text-indigo-700 text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
            
          </div>
        </div>
      </section>
      
      {/* Why Use Section: Full-width background, centered content */}
      <section className="mb-12 bg-green-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <h2 className="text-3xl font-bold mb-5 text-green-800">Why ExpenseTracker?</h2>
          <ul className="space-y-4">
            {whyPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                {/* SVG Checkmark Icon */}
                <svg className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span className="text-lg text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Call to Action: Centered content */}
      <div className="mt-8 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <a 
          href="/register" 
          className="inline-flex items-center justify-center gap-3 bg-green-600 text-white py-4 px-10 rounded-full text-xl font-bold shadow-lg hover:bg-green-700 transition transform hover:scale-105"
        >
          {/* SVG User+ Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
          Create Your Free Account
        </a>
      </div>
      <div><Footer></Footer></div>
    </div>
  );
}
