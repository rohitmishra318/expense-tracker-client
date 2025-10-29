import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Legend, CartesianGrid
} from "recharts";

const COLORS = ["#6366F1", "#22D3EE", "#F59E42", "#EF4444", "#3B82F6"];

export default function Charts({ expenses }) {
  if (!expenses || expenses.length === 0) {
    return <p className="text-center text-gray-600 mt-4">No expenses to visualize yet.</p>;
  }

  // Group by category (for Pie Chart)
  const categoryMap = {};
  expenses.forEach(e => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + Number(e.amount);
  });
  const pieData = Object.entries(categoryMap).map(([category, sum]) => ({
    name: category,
    value: sum
  }));

  // Group by month (for Bar Chart)
  const monthMap = {};
  expenses.forEach(e => {
    const d = new Date(e.date);
    const month = `${d.toLocaleString("default", { month: "short" })} ${d.getFullYear()}`;
    monthMap[month] = (monthMap[month] || 0) + Number(e.amount);
  });
  const barData = Object.entries(monthMap).map(([month, sum]) => ({
    month,
    amount: sum
  }));

  return (
    <div className="flex flex-col md:flex-row gap-8 justify-between">
      {/* Pie Chart - Category Distribution */}
      <div className="w-full md:w-1/2">
        <h3 className="font-bold mb-2 text-center">By Category</h3>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {pieData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart - Monthly Trend */}
      <div className="w-full md:w-1/2">
        <h3 className="font-bold mb-2 text-center">Monthly Trend</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
