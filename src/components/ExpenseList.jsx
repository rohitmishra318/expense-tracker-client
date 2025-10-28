import React from 'react';

const ExpenseList = ({ expenses, onDeleteExpense, onEditExpense }) => {
    
    // Sort expenses by date, newest first.
    // Create a new sorted array without mutating the original 'expenses' prop
    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

    if (sortedExpenses.length === 0) {
        return (
            <div className="p-6 bg-white shadow-lg rounded-xl text-center border border-gray-200">
                <p className="text-gray-500">No expenses added yet. Add one using the form!</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Expense List</h2>
            <ul className="divide-y divide-gray-200">
                {sortedExpenses.map((expense) => (
                    <li key={expense._id} className="py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        {/* Expense Details */}
                        <div className="mb-2 sm:mb-0">
                            <h3 className="text-lg font-medium text-gray-900">{expense.title}</h3>
                            <p className="text-sm text-gray-500">
                                <span className="font-medium bg-gray-100 text-gray-700 py-0.5 px-2 rounded-full">{expense.category}</span>
                                <span className="mx-2">|</span>
                                <span>{new Date(expense.date).toLocaleDateString()}</span>
                            </p>
                        </div>
                        
                        {/* Amount and Actions */}
                        <div className="flex sm:flex-col items-center justify-between">
                            <p className="text-lg font-semibold text-gray-900 sm:text-right">${expense.amount.toFixed(2)}</p>
                            <div className="flex space-x-3 sm:mt-1">
                                <button
                                    onClick={() => onEditExpense(expense)}
                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    // Wrap in an arrow function to pass the ID
                                    onClick={() => onDeleteExpense(expense._id)} 
                                    className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;
