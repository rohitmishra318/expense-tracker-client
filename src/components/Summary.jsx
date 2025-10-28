import React from 'react';

const Summary = ({ expenses }) => {
    // Calculate total amount using .reduce()
    const totalAmount = expenses.reduce((accumulator, currentExpense) => {
        return accumulator + currentExpense.amount;
    }, 0); // Start with 0

    // Group expenses by category and calculate totals
    const categorySummary = expenses.reduce((acc, expense) => {
        const category = expense.category;
        
        // If the category isn't in the accumulator, add it with the current amount
        if (!acc[category]) {
            acc[category] = expense.amount;
        } else {
            // Otherwise, add the current amount to the existing total
            acc[category] += expense.amount;
        }
        
        return acc; // Return the updated accumulator for the next iteration
    }, {}); // Start with an empty object

    return (
        <div className="p-6 bg-white shadow-lg rounded-xl space-y-4 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Summary</h2>
            
            {/* Total Expenses */}
            <div className="flex justify-between items-center py-3 border-b-2 border-gray-100">
                <span className="text-lg font-medium text-gray-900">Total Expenses</span>
                <span className="text-2xl font-bold text-indigo-600">${totalAmount.toFixed(2)}</span>
            </div>

            {/* Category-wise Summary */}
            <h3 className="text-lg font-semibold text-gray-800 pt-4">By Category</h3>
            {Object.keys(categorySummary).length > 0 ? (
                <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
                    {/* Convert object entries to an array to map over them */}
                    {Object.entries(categorySummary).map(([category, amount]) => (
                        <li key={category} className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                            <span className="text-gray-700 font-medium">{category}</span>
                            <span className="font-medium text-gray-900">${amount.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 text-sm">No expenses to summarize by category.</p>
            )}
        </div>
    );
};

export default Summary;
