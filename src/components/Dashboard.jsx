import { useEffect, useState } from 'react';
import { get, EXPENSE_API } from '../services/api';
import { getToken } from '../services/auth';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts';

const COLORS = ['#6366F1', '#22D3EE', '#F59E42', '#EF4444', '#3B82F6'];

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  const token = getToken();

  useEffect(() => {
    async function fetchExpenses() {
      const data = await get(EXPENSE_API, token);
      setExpenses(data || []);
    }
    fetchExpenses();
  }, [token]);

  // Group by category for pie chart
  const categoryMap = {};
  expenses.forEach(e => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + Number(e.amount);
  });
  const pieData = Object.entries(categoryMap).map(([category, sum]) => ({
    name: category, value: sum
  }));

  // Group by month for bar chart
  const monthMap = {};
  expenses.forEach(e => {
    const month = new Date(e.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    monthMap[month] = (monthMap[month] || 0) + Number(e.amount);
  });
  const barData = Object.entries(monthMap).map(([month, sum]) => ({
    month, amount: sum
  }));

  const total = expenses.reduce((a, e) => a + Number(e.amount), 0);

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <p className="mb-4 text-lg">Total Expenses: <b className="text-indigo-600">₹{total}</b></p>

      <div className="flex flex-col md:flex-row gap-8 justify-between">
        <div className="w-full md:w-1/2">
          <h3 className="font-bold mb-2">By Category</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} fill="#6366F1" label>
                {pieData.map((entry, idx) => <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="font-bold mb-2">Monthly Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={barData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
