import { useState, useEffect } from 'react';
import { get, post, put, _delete, EXPENSE_API } from '../services/api';
import { getToken } from '../services/auth';
import { FaUtensils, FaTshirt, FaBus, FaHome, FaQuestion, FaEdit, FaTrash } from 'react-icons/fa';
import Charts from '../components/Chart'; // ✅ Import your chart component here

export default function Tracker() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title: '', amount: '', category: '', date: '' });
  const [message, setMessage] = useState('');
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', amount: '', category: '', date: '' });
  const token = getToken();

  // Category icons
  const getCategoryIcon = (category) => {
    const icons = {
      food: <FaUtensils className="text-orange-500 text-xl" />,
      clothing: <FaTshirt className="text-blue-500 text-xl" />,
      travel: <FaBus className="text-green-500 text-xl" />,
      rent: <FaHome className="text-purple-500 text-xl" />,
    };
    return icons[category?.toLowerCase()] || <FaQuestion className="text-gray-400 text-xl" />;
  };

  // Fetch all expenses
  useEffect(() => {
    async function fetchExpenses() {
      const data = await get(EXPENSE_API, token);
      setExpenses(data);
    }
    fetchExpenses();
  }, [token]);

  // Handlers
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const result = await post(EXPENSE_API, form, token);
    if (result._id) {
      setExpenses([...expenses, result]);
      setForm({ title: '', amount: '', category: '', date: '' });
      setMessage('Expense added!');
    } else {
      setMessage(result.error || 'Failed to add.');
    }
  };

  const handleEdit = (expense) => {
    setEditId(expense._id);
    setEditForm({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date.slice(0, 10),
    });
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    const result = await put(`${EXPENSE_API}/${editId}`, editForm, token);
    setExpenses(expenses.map((exp) => (exp._id === editId ? result : exp)));
    setEditId(null);
    setMessage('Expense updated!');
  };

  const handleEditCancel = () => setEditId(null);

  const handleDelete = async (id) => {
    await _delete(`${EXPENSE_API}/${id}`, token);
    setExpenses(expenses.filter((e) => e._id !== id));
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-8 max-w-7xl mx-auto mt-10 p-6 bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow-lg">
      {/* LEFT SIDE — Add / Edit Form */}
      <div className="md:w-1/3 bg-white rounded-xl p-5 shadow-md">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">Add New Expense</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            required
            onChange={handleChange}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            name="amount"
            type="number"
            placeholder="Amount (₹)"
            value={form.amount}
            required
            onChange={handleChange}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            name="category"
            placeholder="Category (e.g. Food, Clothing)"
            value={form.category}
            required
            onChange={handleChange}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            name="date"
            type="date"
            value={form.date}
            required
            onChange={handleChange}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white rounded py-2 mt-1 hover:bg-indigo-700 transition"
          >
            ➕ Add Expense
          </button>
        </form>
        {message && <p className="mt-3 text-center text-green-600 font-medium">{message}</p>}
      </div>

      {/* RIGHT SIDE — Expenses List + Charts */}
      <div className="md:w-2/3 flex flex-col gap-8">
        {/* Expense List */}
        <div className="bg-white rounded-xl p-5 shadow-md">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">My Expenses</h2>
          <ul className="space-y-4">
            {expenses.length === 0 && (
              <li className="text-gray-500 text-center">No expenses added yet!</li>
            )}
            {expenses.map((e) => (
              <li
                key={e._id}
                className="flex justify-between items-center bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                {editId === e._id ? (
                  <form
                    onSubmit={handleEditSave}
                    className="flex gap-2 flex-wrap items-center w-full"
                  >
                    <input
                      type="text"
                      name="title"
                      value={editForm.title}
                      onChange={handleEditChange}
                      required
                      className="border p-1 rounded w-24"
                    />
                    <input
                      type="number"
                      name="amount"
                      value={editForm.amount}
                      onChange={handleEditChange}
                      required
                      className="border p-1 rounded w-20"
                    />
                    <input
                      type="text"
                      name="category"
                      value={editForm.category}
                      onChange={handleEditChange}
                      required
                      className="border p-1 rounded w-24"
                    />
                    <input
                      type="date"
                      name="date"
                      value={editForm.date}
                      onChange={handleEditChange}
                      required
                      className="border p-1 rounded w-32"
                    />
                    <button type="submit" className="text-green-600 font-medium">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleEditCancel}
                      className="text-gray-600 font-medium"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <div className="flex items-center gap-4">
                      {getCategoryIcon(e.category)}
                      <div>
                        <p className="font-semibold text-gray-800">{e.title}</p>
                        <p className="text-sm text-gray-500">
                          ₹{e.amount} • {e.category.charAt(0).toUpperCase() + e.category.slice(1)} •{' '}
                          {new Date(e.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleEdit(e)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(e._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* ✅ Charts Section */}
        <div className="bg-white rounded-xl p-5 shadow-md">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">
            Expense Insights
          </h2>
          <Charts expenses={expenses} />
        </div>
      </div>
    </div>
  );
}
