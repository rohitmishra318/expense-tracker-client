import React from 'react';
// Make sure you have run: npm install recharts
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define an array of colors for the chart segments
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919', '#82ca9d', '#ffc658'];

const ExpenseChart = ({ expenses }) => {
    
    // Process data for the chart
    // This is the same logic as in Summary.jsx, but formatted for Recharts
    const categorySummary = expenses.reduce((acc, expense) => {
        const category = expense.category;
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += expense.amount;
        return acc;
    }, {});

    // Format the data into an array: [{ name: 'Food', value: 400 }, ...]
    const chartData = Object.entries(categorySummary).map(([name, value]) => ({ 
        name, 
        value: parseFloat(value.toFixed(2)) // Ensure value is a number
    }));

    if (chartData.length === 0) {
        return (
            <div className="p-6 bg-white shadow-lg rounded-xl h-80 flex items-center justify-center border border-gray-200">
                <p className="text-gray-500">No data available for chart.</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Expense Distribution</h2>
            {/* ResponsiveContainer makes the chart adapt to its parent's size */}
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%" // Center X
                        cy="50%" // Center Y
                        labelLine={false}
                        outerRadius={100} // Size of the pie
                        fill="#8884d8"
                        dataKey="value" // The key in chartData that holds the value
                        // Custom label to show name and percentage
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                        {/* Map over data to assign a color to each cell */}
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    {/* Tooltip shows details on hover */}
                    <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                    {/* Legend displays the category names */}
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ExpenseChart;
