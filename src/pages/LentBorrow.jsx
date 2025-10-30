// src/pages/LentBorrow.jsx

import { useState, useEffect } from 'react';
import { get, post, put, _delete, LENDBORROW_API } from '../services/api';
import { getToken } from '../services/auth';
import { motion } from 'framer-motion'; // 1. Import motion
import { 
  ArrowUpRight, ArrowDownLeft, CheckCircle2, Trash2, Clock, Search, UserCheck2, Plus
} from "lucide-react";

// Animation for list items
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function LentBorrow() {
  const [entries, setEntries] = useState([]);
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({
    friendName: '',
    amount: '',
    type: 'lent',
    reason: ''
  });
  const [message, setMessage] = useState('');
  const token = getToken();

  // --- (All logic functions: searchUsers, useEffects, handleChange, selectUser, handleSubmit, handleSettle, handleDelete remain exactly the same) ---

  // Search for users as typing
  const searchUsers = async (username) => {
    if (!username) {
      setUserSuggestions([]);
      return;
    }
    try {
      // Assuming your auth server is on port 4000
      const response = await fetch(`http://localhost:4000/api/auth/users/search?username=${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const users = await response.json();
        setUserSuggestions(users.filter(u => u.username.toLowerCase().includes(username.toLowerCase())));
      }
    } catch (err) {
      console.error('Error searching users:', err);
    }
  };

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (form.friendName && !selectedUser) {
        searchUsers(form.friendName);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [form.friendName, selectedUser]); // Added selectedUser dependency

  // Fetch entries
  useEffect(() => {
    async function fetchEntries() {
      const data = await get(LENDBORROW_API, token);
      setEntries(data || []);
    }
    fetchEntries();
  }, [token]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === 'friendName') {
      setSelectedUser(null);
      setUserSuggestions([]); // Clear suggestions when user types
    }
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    setForm(prev => ({ ...prev, friendName: user.username }));
    setUserSuggestions([]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!selectedUser) {
      setMessage('❌ Please select a valid user from the suggestions.');
      return;
    }
    setMessage('');
    const result = await post(LENDBORROW_API, { ...form, friendId: selectedUser._id }, token);
    if (result._id) {
      setEntries([result, ...entries]); // Add to the top of the list
      setForm({ friendName: '', amount: '', type: 'lent', reason: '' });
      setSelectedUser(null); // Clear selected user
      setMessage('✅ Entry added successfully!');
    } else {
      setMessage(result.error || '❌ Failed to add entry.');
    }
  };

  const handleSettle = async id => {
    const result = await put(`${LENDBORROW_API}/${id}`, { status: 'settled' }, token);
    setEntries(entries.map(e => (e._id === id ? result : e)));
  };

  const handleDelete = async id => {
    await _delete(`${LENDBORROW_API}/${id}`, token);
    setEntries(entries.filter(e => e._id !== id));
  };

  // --- Summary Stats ---
  const totalLent = entries.filter(e => e.type === 'lent' && e.status !== 'settled').reduce((a, e) => a + Number(e.amount), 0);
  const totalBorrowed = entries.filter(e => e.type === 'borrowed' && e.status !== 'settled').reduce((a, e) => a + Number(e.amount), 0);
  const unsettled = entries.filter(e => e.status !== 'settled').length;

  return (
    // 2. Main container with animation and dark mode
    <motion.div 
      className="max-w-3xl mx-auto mt-10 mb-24 p-6 bg-white dark:bg-zinc-800/50 rounded-2xl shadow-lg border dark:border-zinc-700"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-indigo-700 dark:text-indigo-400 text-center">💸 Lent & Borrow Tracker</h2>

      {/* 3. Summary Cards with dark mode */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
        <div className="bg-indigo-50 dark:bg-zinc-800 p-4 rounded-xl shadow-sm border dark:border-indigo-600/50">
          <h4 className="text-indigo-700 dark:text-indigo-300 font-semibold">Total Lent (Pending)</h4>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">₹{totalLent}</p>
        </div>
        <div className="bg-cyan-50 dark:bg-zinc-800 p-4 rounded-xl shadow-sm border dark:border-cyan-600/50">
          <h4 className="text-cyan-700 dark:text-cyan-300 font-semibold">Total Borrowed (Pending)</h4>
          <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">₹{totalBorrowed}</p>
        </div>
        <div className="bg-yellow-50 dark:bg-zinc-800 p-4 rounded-xl shadow-sm border dark:border-yellow-600/50">
          <h4 className="text-yellow-700 dark:text-yellow-300 font-semibold">Unsettled Items</h4>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{unsettled}</p>
        </div>
      </div>

      {/* 4. Add Entry Form with dark mode */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-xl shadow-sm mb-6 border dark:border-zinc-700 transition"
      >
        <h3 className="font-semibold text-lg mb-3 text-indigo-600 dark:text-indigo-400">Add a New Entry</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative">
            <input
              name="friendName"
              placeholder="Friend's Username"
              value={form.friendName}
              required
              onChange={handleChange}
              autoComplete="off"
              className="border p-2 rounded focus:ring-2 focus:ring-indigo-400 outline-none w-full dark:bg-zinc-700 dark:border-zinc-600 dark:text-white dark:placeholder-zinc-400"
            />
            {/* User suggestions dropdown */}
            {userSuggestions.length > 0 && !selectedUser && (
              <div className="absolute mt-1 w-full bg-white dark:bg-zinc-700 border dark:border-zinc-600 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {userSuggestions.map(user => (
                  <button
                    key={user._id}
                    type="button"
                    onClick={() => selectUser(user)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-600 flex items-center gap-2 dark:text-zinc-200"
                  >
                    <Search className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
                    {user.username}
                  </button>
                ))}
              </div>
            )}
            {selectedUser && (
              <div className="mt-1 text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                <UserCheck2 className="w-4 h-4" />
                User selected: {selectedUser.username}
              </div>
            )}
          </div>
          <input
            name="amount"
            type="number"
            placeholder="Amount (₹)"
            value={form.amount}
            required
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-indigo-400 outline-none dark:bg-zinc-700 dark:border-zinc-600 dark:text-white dark:placeholder-zinc-400"
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-indigo-400 outline-none dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
          >
            <option value="lent">I Lent Money</option>
            <option value="borrowed">I Borrowed Money</option>
          </select>
          <input
            name="reason"
            placeholder="Reason (optional)"
            value={form.reason}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-indigo-400 outline-none dark:bg-zinc-700 dark:border-zinc-600 dark:text-white dark:placeholder-zinc-400"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 mt-4 text-white font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all w-full flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Add Entry
        </button>
      </form>

      {message && <p className={`text-center mb-4 font-medium ${message.startsWith('✅') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{message}</p>}

      {/* 5. Entries List with dark mode and animation */}
      <div className="space-y-3">
        {entries.length === 0 && (
          <p className="text-gray-500 dark:text-zinc-400 text-center italic py-4">No records yet. Add your first entry above!</p>
        )}
        {entries.map(e => (
          <motion.div
            key={e._id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className={`p-4 rounded-xl shadow-sm border-l-4 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center transition hover:shadow-md ${
              e.type === 'lent' 
              ? 'border-indigo-500 bg-indigo-50 dark:bg-zinc-800 dark:border-indigo-600' 
              : 'border-cyan-500 bg-cyan-50 dark:bg-zinc-800 dark:border-cyan-600'
            }`}
          >
            <div className="flex flex-col">
              <span className="font-semibold text-lg text-gray-700 dark:text-zinc-100">
                {e.type === 'lent' ? (
                  <><ArrowUpRight className="inline text-indigo-500 dark:text-indigo-400 mr-1" /> Lent to {e.friendName}</>
                ) : (
                  <><ArrowDownLeft className="inline text-cyan-500 dark:text-cyan-400 mr-1" /> Borrowed from {e.friendName}</>
                )}
              </span>
              <span className="text-gray-600 dark:text-zinc-300 flex items-center gap-1">
                <span className="font-medium">₹{e.amount}</span>
                {e.type === 'lent' ? (
                  <span className="text-sm text-gray-500 dark:text-zinc-400">({e.lenderName} → {e.borrowerName})</span>
                ) : (
                  <span className="text-sm text-gray-500 dark:text-zinc-400">({e.borrowerName} → {e.lenderName})</span>
                )}
              </span>
              <span className="text-sm text-gray-500 dark:text-zinc-400">
                <Clock className="inline w-4 h-4 mr-1" />
                {new Date(e.date).toLocaleDateString()}
              </span>
              {e.reason && (
                <span className="text-sm text-gray-600 dark:text-zinc-400 mt-1">Reason: {e.reason}</span>
              )}
              <span className={`font-medium mt-1 ${e.status === 'settled' ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                Status: {e.status}
              </span>
            </div>
            <div className="mt-3 sm:mt-0 flex gap-4">
              {e.status !== 'settled' && (
                <button
                  onClick={() => handleSettle(e._id)}
                  className="flex items-center text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300 transition"
                >
                  <CheckCircle2 className="mr-1 w-4 h-4" /> Settle
                </button>
              )}
              <button
                onClick={() => handleDelete(e._id)}
                className="flex items-center text-red-600 dark:text-red-400 font-medium hover:text-red-700 dark:hover:text-red-300 transition"
              >
                <Trash2 className="mr-1 w-4 h-4" /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}