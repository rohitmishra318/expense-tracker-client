// src/pages/Tracker.jsx

import { useState, useEffect } from "react";
import { get, post, put, _delete, EXPENSE_API } from "../services/api";
import { getToken } from "../services/auth";
import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  Shirt,
  Bus,
  Home,
  HelpCircle,
  FilePenLine,
  Trash2,
  Plus,
  Save,
  X,
} from "lucide-react";
import Charts from "../components/Chart";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Tracker() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title: "", amount: "", category: "", date: "" });
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", amount: "", category: "", date: "" });
  const token = getToken();

  // ✅ Category icon mapper
  const getCategoryIcon = (category) => {
    const icons = {
      food: <UtensilsCrossed size={20} className="text-orange-500" />,
      clothing: <Shirt size={20} className="text-blue-500" />,
      travel: <Bus size={20} className="text-green-500" />,
      rent: <Home size={20} className="text-purple-500" />,
    };
    return icons[category?.toLowerCase()] || <HelpCircle size={20} className="text-gray-400" />;
  };

  // ✅ Fetch expenses on mount
  useEffect(() => {
    async function fetchExpenses() {
      try {
        const data = await get(EXPENSE_API, token);
        if (Array.isArray(data)) setExpenses(data);
      } catch (err) {
        console.error("Error fetching expenses:", err);
      }
    }
    fetchExpenses();
  }, [token]);

  // ✅ Form Handlers
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  // ✅ Add new expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const result = await post(EXPENSE_API, form, token);
      if (result && result._id) {
        setExpenses([...expenses, result]);
        setForm({ title: "", amount: "", category: "", date: "" });
        setMessage("Expense added successfully!");
      } else {
        setMessage(result?.error || "Failed to add expense.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    }
  };

  // ✅ Edit mode setup
  const handleEdit = (expense) => {
    setEditId(expense._id);
    setEditForm({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date.slice(0, 10),
    });
  };

  // ✅ Save edited expense
  const handleEditSave = async (e) => {
    e.preventDefault();
    try {
      const result = await put(`${EXPENSE_API}/${editId}`, editForm, token);
      setExpenses((prev) => prev.map((exp) => (exp._id === editId ? result : exp)));
      setEditId(null);
      setMessage("Expense updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update expense.");
    }
  };

  // ✅ Cancel edit
  const handleEditCancel = () => setEditId(null);

  // ✅ Delete expense
  const handleDelete = async (id) => {
    try {
      await _delete(`${EXPENSE_API}/${id}`, token);
      setExpenses(expenses.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-8 max-w-7xl mx-auto mt-10 p-4 sm:p-6">
      {/* LEFT: Add Expense */}
      <motion.div
        className="md:w-1/3 bg-white dark:bg-zinc-800/50 rounded-xl p-5 shadow-lg border dark:border-zinc-700"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-4 text-center">
          Add New Expense
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="title"
            placeholder="Title (e.g. Coffee)"
            value={form.title}
            required
            onChange={handleChange}
            className="border p-2 rounded dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
          />
          <input
            name="amount"
            type="number"
            placeholder="Amount (₹)"
            value={form.amount}
            required
            onChange={handleChange}
            className="border p-2 rounded dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
          />
          <input
            name="category"
            placeholder="Category (e.g. Food)"
            value={form.category}
            required
            onChange={handleChange}
            className="border p-2 rounded dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
          />
          <input
            name="date"
            type="date"
            value={form.date}
            required
            onChange={handleChange}
            className="border p-2 rounded dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
          />

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white rounded py-2 mt-1 hover:bg-indigo-700 transition"
          >
            <Plus size={18} /> Add Expense
          </button>
        </form>

        {message && (
          <p className="mt-3 text-center text-green-600 dark:text-green-400 font-medium">
            {message}
          </p>
        )}
      </motion.div>

      {/* RIGHT: Expenses + Charts */}
      <motion.div
        className="md:w-2/3 flex flex-col gap-8"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Expense List */}
        <div className="bg-white dark:bg-zinc-800/50 rounded-xl p-5 shadow-lg border dark:border-zinc-700">
          <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-4 text-center">
            My Expenses
          </h2>

          <ul className="space-y-4">
            {expenses.length === 0 ? (
              <li className="text-zinc-500 dark:text-zinc-400 text-center py-4">
                No expenses added yet!
              </li>
            ) : (
              expenses.map((e) => (
                <motion.li
                  key={e._id}
                  className="bg-white dark:bg-zinc-700 border dark:border-zinc-600 rounded-xl p-4 shadow-sm"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {editId === e._id ? (
                    <form onSubmit={handleEditSave} className="flex flex-col gap-3 w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="title"
                          value={editForm.title}
                          onChange={handleEditChange}
                          required
                          className="border p-2 rounded dark:bg-zinc-600 dark:border-zinc-500"
                        />
                        <input
                          type="number"
                          name="amount"
                          value={editForm.amount}
                          onChange={handleEditChange}
                          required
                          className="border p-2 rounded dark:bg-zinc-600 dark:border-zinc-500"
                        />
                        <input
                          type="text"
                          name="category"
                          value={editForm.category}
                          onChange={handleEditChange}
                          required
                          className="border p-2 rounded dark:bg-zinc-600 dark:border-zinc-500"
                        />
                        <input
                          type="date"
                          name="date"
                          value={editForm.date}
                          onChange={handleEditChange}
                          required
                          className="border p-2 rounded dark:bg-zinc-600 dark:border-zinc-500"
                        />
                      </div>
                      <div className="flex gap-3 mt-2">
                        <button
                          type="submit"
                          className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-medium p-2 rounded-lg transition"
                        >
                          <Save size={18} /> Save
                        </button>
                        <button
                          type="button"
                          onClick={handleEditCancel}
                          className="flex items-center justify-center gap-2 w-full bg-gray-200 hover:bg-gray-300 dark:bg-zinc-600 dark:hover:bg-zinc-500 text-black dark:text-white font-medium p-2 rounded-lg transition"
                        >
                          <X size={18} /> Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        {getCategoryIcon(e.category)}
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-zinc-100">
                            {e.title}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-zinc-400">
                            ₹{e.amount} •{" "}
                            {e.category.charAt(0).toUpperCase() + e.category.slice(1)} •{" "}
                            {new Date(e.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          className="text-blue-500 hover:text-blue-400 transition"
                          onClick={() => handleEdit(e)}
                        >
                          <FilePenLine size={18} />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-400 transition"
                          onClick={() => handleDelete(e._id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.li>
              ))
            )}
          </ul>
        </div>

        {/* Charts Section */}
        <div className="bg-white dark:bg-zinc-800/50 rounded-xl p-5 shadow-lg border dark:border-zinc-700">
          <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-4 text-center">
            Expense Insights
          </h2>
          <Charts expenses={expenses} />
        </div>
      </motion.div>
    </div>
  );
}
