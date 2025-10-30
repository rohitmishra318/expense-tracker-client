// src/pages/Profile.jsx

import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getToken, removeToken } from '../services/auth';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [borrowLend, setBorrowLend] = useState([]);

  const COLORS = ['#4F46E5', '#22C55E', '#F97316', '#EC4899', '#06B6D4'];

  useEffect(() => {
    const token = getToken();
    const stored = localStorage.getItem('currentUser');

    if (stored) {
      setProfile(JSON.parse(stored));
    } else if (token) {
      try {
        const decoded = jwtDecode(token);
        setProfile(decoded);
      } catch (err) {
        console.warn('Could not decode token locally:', err.message);
      }
    }

    if (token) fetchData(token);
  }, []);

  const fetchData = async (token) => {
    try {
      const expenseRes = await fetch('http://localhost:4001/api/expenses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const expenseData = expenseRes.ok ? await expenseRes.json() : [];

      const lbRes = await fetch('http://localhost:4002/api/lendborrow', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const lbData = lbRes.ok ? await lbRes.json() : [];

      setExpenses(Array.isArray(expenseData) ? expenseData : []);
      setBorrowLend(Array.isArray(lbData) ? lbData : []);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  };

  // ✅ Group expenses by category safely
  const expenseSummary = Object.values(
    expenses.reduce((acc, e) => {
      const category = e.category || 'Uncategorized';
      acc[category] = acc[category] || { name: category, value: 0 };
      acc[category].value += Number(e.amount || 0);
      return acc;
    }, {})
  );

  // ✅ Summarize lent and borrowed amounts
  const lendBorrowSummary = [
    {
      name: 'Lent',
      amount: borrowLend
        .filter((b) => b.type === 'lent')
        .reduce((sum, b) => sum + Number(b.amount || 0), 0),
    },
    {
      name: 'Borrowed',
      amount: borrowLend
        .filter((b) => b.type === 'borrowed')
        .reduce((sum, b) => sum + Number(b.amount || 0), 0),
    },
  ];

  return (
    <motion.div
      className="max-w-6xl mx-auto mt-12 mb-24 p-8 bg-white dark:bg-zinc-800/50 rounded-2xl shadow-lg border dark:border-zinc-700"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center border-b dark:border-zinc-700 pb-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">
            Welcome, {profile?.username || 'User'} 👋
          </h2>
          <p className="text-gray-500 dark:text-zinc-400 text-sm">
            Here’s your financial overview
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Expense Breakdown */}
        <motion.div
          className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-md border dark:border-zinc-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-4 text-center">
            Expense Breakdown
          </h3>
          {expenseSummary.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseSummary}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  labelLine={false}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {expenseSummary.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 dark:text-zinc-400 text-center mt-16">
              No expense data available.
            </p>
          )}
        </motion.div>

        {/* Lent vs Borrowed */}
        <motion.div
          className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-md border dark:border-zinc-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-4 text-center">
            Lent vs Borrowed
          </h3>
          {lendBorrowSummary.some((item) => item.amount > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={lendBorrowSummary}>
                <XAxis dataKey="name" tick={{ fill: '#6B7280' }} />
                <YAxis tick={{ fill: '#6B7280' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                  }}
                />
                <Legend />
                <Bar dataKey="amount" fill="#10B981" barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 dark:text-zinc-400 text-center mt-16">
              No lent/borrowed data found.
            </p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
