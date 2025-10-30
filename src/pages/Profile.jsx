import { useState, useEffect } from 'react';
// jwt-decode may export a named `decode` depending on package version
import { jwtDecode } from 'jwt-decode';
import { getToken, removeToken } from '../services/auth';
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
    // Prefer stored user (saved on login). Fallback to decoding token.
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
      // Fetch user’s expenses
      const expenseRes = await fetch('http://localhost:4001/api/expenses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const expenseData = expenseRes.ok ? await expenseRes.json() : [];

      // Fetch lent/borrowed data
      const lbRes = await fetch('http://localhost:4002/api/lendborrow', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const lbData = lbRes.ok ? await lbRes.json() : [];

      setExpenses(expenseData);
      setBorrowLend(lbData);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  function handleLogout() {
    removeToken();
    window.location.href = '/login';
  }

  // Group expenses by category
  const expenseSummary = Object.values(
    expenses.reduce((acc, e) => {
      acc[e.category] = acc[e.category] || { name: e.category, value: 0 };
      acc[e.category].value += Number(e.amount || 0);
      return acc;
    }, {})
  );

  // Sum lent and borrowed
  const lendBorrowSummary = [
    {
      name: 'Lent',
      amount: borrowLend.filter(b => b.type === 'lent').reduce((sum, b) => sum + Number(b.amount || 0), 0),
    },
    {
      name: 'Borrowed',
      amount: borrowLend.filter(b => b.type === 'borrowed').reduce((sum, b) => sum + Number(b.amount || 0), 0),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-12 mb-24 p-8 bg-white rounded-2xl shadow-lg">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-indigo-700">
            Welcome, {profile?.username || 'User'} 👋
          </h2>
          <p className="text-gray-500 text-sm">Here’s your financial overview</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Expense Breakdown */}
        <div className="bg-indigo-50 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-indigo-700 mb-4 text-center">
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
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center mt-16">No expense data available.</p>
          )}
        </div>

        {/* Lent vs Borrowed */}
        <div className="bg-green-50 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">
            Lent vs Borrowed
          </h3>
          {lendBorrowSummary.some(item => item.amount > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={lendBorrowSummary}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#10B981" barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center mt-16">No lent/borrowed data found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
