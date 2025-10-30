import { useState, useEffect } from 'react';
import { get, post, put, _delete, LENDBORROW_API } from '../services/api';
import { getToken } from '../services/auth';
import { ArrowUpRight, ArrowDownLeft, CheckCircle2, Trash2, Clock, Search, UserCheck2 } from "lucide-react";

// For TypeScript (optional):
// interface User {
//   _id: string;
//   username: string;
//   email?: string;
// }

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

  // Search for users as typing
  const searchUsers = async (username) => {
    if (!username) {
      setUserSuggestions([]);
      return;
    }
    try {
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

  // Debounce search to avoid too many requests
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (form.friendName && !selectedUser) {
        searchUsers(form.friendName);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [form.friendName]);

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
      setEntries(entries.concat(result));
      setForm({ friendName: '', amount: '', type: 'lent', reason: '' });
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
  const totalLent = entries.filter(e => e.type === 'lent').reduce((a, e) => a + Number(e.amount), 0);
  const totalBorrowed = entries.filter(e => e.type === 'borrowed').reduce((a, e) => a + Number(e.amount), 0);
  const unsettled = entries.filter(e => e.status !== 'settled').length;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center">💸 Lent & Borrow Tracker</h2>

      {/* --- Summary Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
        <div className="bg-indigo-50 p-4 rounded-xl shadow-sm">
          <h4 className="text-indigo-700 font-semibold">Total Lent</h4>
          <p className="text-2xl font-bold text-indigo-600">₹{totalLent}</p>
        </div>
        <div className="bg-cyan-50 p-4 rounded-xl shadow-sm">
          <h4 className="text-cyan-700 font-semibold">Total Borrowed</h4>
          <p className="text-2xl font-bold text-cyan-600">₹{totalBorrowed}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl shadow-sm">
          <h4 className="text-yellow-700 font-semibold">Unsettled</h4>
          <p className="text-2xl font-bold text-yellow-600">{unsettled}</p>
        </div>
      </div>

      {/* --- Add Entry Form --- */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-4 rounded-xl shadow-sm mb-6 border border-gray-100 hover:shadow-md transition"
      >
        <h3 className="font-semibold text-lg mb-3 text-indigo-600">Add a New Entry</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative">
            <input
              name="friendName"
              placeholder="Friend's Username"
              value={form.friendName}
              required
              onChange={handleChange}
              className="border p-2 rounded focus:ring-2 focus:ring-indigo-400 outline-none w-full"
            />
            {/* User suggestions dropdown */}
            {userSuggestions.length > 0 && !selectedUser && (
              <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {userSuggestions.map(user => (
                  <button
                    key={user._id}
                    type="button"
                    onClick={() => selectUser(user)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <Search className="w-4 h-4 text-gray-500" />
                    {user.username}
                  </button>
                ))}
              </div>
            )}
            {selectedUser && (
              <div className="mt-1 text-sm text-green-600 flex items-center gap-1">
                <UserCheck2 className="w-4 h-4" />
                User verified
              </div>
            )}
          </div>
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={form.amount}
            required
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
          >
            <option value="lent">Lent</option>
            <option value="borrowed">Borrowed</option>
          </select>
          <input
            name="reason"
            placeholder="Reason (optional)"
            value={form.reason}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 mt-4 text-white font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all w-full"
        >
          Add Entry
        </button>
      </form>

      {message && <p className="text-center mb-4 text-green-600 font-medium">{message}</p>}

      {/* --- Entries List --- */}
      <div className="space-y-3">
        {entries.length === 0 && (
          <p className="text-gray-500 text-center italic">No records yet. Add your first entry above!</p>
        )}
        {entries.map(e => (
          <div
            key={e._id}
            className={`p-4 rounded-xl shadow-sm border-l-4 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center transition hover:shadow-md ${
              e.type === 'lent' ? 'border-indigo-500 bg-indigo-50' : 'border-cyan-500 bg-cyan-50'
            }`}
          >
            <div className="flex flex-col">
              <span className="font-semibold text-lg text-gray-700">
                {e.type === 'lent' ? (
                  <><ArrowUpRight className="inline text-indigo-500 mr-1" /> Lent to {e.friendName}</>
                ) : (
                  <><ArrowDownLeft className="inline text-cyan-500 mr-1" /> Borrowed from {e.friendName}</>
                )}
              </span>
              <span className="text-gray-600 flex items-center gap-1">
                <span className="font-medium">₹{e.amount}</span>
                {e.type === 'lent' ? (
                  <span className="text-sm text-gray-500">({e.lenderName} → {e.borrowerName})</span>
                ) : (
                  <span className="text-sm text-gray-500">({e.borrowerName} → {e.lenderName})</span>
                )}
              </span>
              <span className="text-sm text-gray-500">
                <Clock className="inline w-4 h-4 mr-1" />
                {new Date(e.date).toLocaleDateString()}
              </span>
              {e.reason && (
                <span className="text-sm text-gray-600 mt-1">Reason: {e.reason}</span>
              )}
              <span className={`font-medium mt-1 ${e.status === 'settled' ? 'text-green-600' : 'text-orange-600'}`}>
                Status: {e.status}
              </span>
            </div>
            <div className="mt-3 sm:mt-0 flex gap-3">
              {e.status !== 'settled' && (
                <button
                  onClick={() => handleSettle(e._id)}
                  className="flex items-center text-green-600 font-medium hover:text-green-700"
                >
                  <CheckCircle2 className="mr-1 w-4 h-4" /> Settle
                </button>
              )}
              <button
                onClick={() => handleDelete(e._id)}
                className="flex items-center text-red-600 font-medium hover:text-red-700"
              >
                <Trash2 className="mr-1 w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
