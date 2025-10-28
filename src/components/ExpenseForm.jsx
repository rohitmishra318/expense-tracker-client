import { useState, useEffect } from 'react';

const ExpenseForm = ({ onAddExpense, onUpdateExpense, expenseToEdit, setExpenseToEdit }) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const isEditing = !!expenseToEdit;

    // Effect to populate the form when an item is selected for editing
    useEffect(() => {
        if (isEditing) {
            setTitle(expenseToEdit.title);
            setAmount(expenseToEdit.amount);
            setCategory(expenseToEdit.category);
            // Format the date correctly for the input[type="date"]
            // The date from MongoDB might be a full ISO string
            setDate(new Date(expenseToEdit.date).toISOString().split('T')[0]);
        }
    }, [expenseToEdit, isEditing]);

    // Function to clear form fields
    const clearForm = () => {
        setTitle('');
        setAmount('');
        setCategory('');
        setDate('');
        setErrorMessage('');
        if (isEditing) {
            setExpenseToEdit(null); // Clear the edit state
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous errors

        if (!title || !amount || !category || !date) {
            setErrorMessage('Please fill in all fields.');
            return;
        }
        if (+amount <= 0) {
            setErrorMessage('Amount must be a positive number.');
            return;
        }

        const expenseData = {
            title,
            amount: +amount, // Ensure amount is a number
            category,
            date
        };

        if (isEditing) {
            // Call update function passed from App.jsx
            onUpdateExpense(expenseToEdit._id, expenseData);
        } else {
            // Call add function passed from App.jsx
            onAddExpense(expenseData);
        }
        
        clearForm(); // Clear the form after submission
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-xl space-y-4 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{isEditing ? 'Edit Expense' : 'Add New Expense'}</h2>
            
            {/* Error Message Display */}
            {errorMessage && (
                <div className="p-3 bg-red-100 border border-red-300 text-red-800 rounded-md">
                    {errorMessage}
                </div>
            )}

            {/* Form Fields */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Coffee"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount ($)</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g., 5.00"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., Food"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 pt-2">
                <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                    {isEditing ? 'Update Expense' : 'Add Expense'}
                </button>
                {isEditing && (
                    <button
                        type="button"
                        onClick={clearForm} // Use the clearForm function to cancel
                        className="w-full sm:w-auto inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        Cancel Edit
                    </button>
                )}
            </div>
        </form>
    );
};

export default ExpenseForm;
