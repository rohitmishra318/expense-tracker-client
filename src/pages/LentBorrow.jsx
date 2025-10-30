// src/pages/LentBorrow.jsx
import { useState, useEffect } from 'react';
import { get, post, put, _delete, LENDBORROW_API, AUTH_API } from '../services/api';
import { getToken } from '../services/auth';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, ArrowDownLeft, CheckCircle2, Trash2, Clock, UserPlus, Users, UserCheck2, Plus
} from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function LentBorrow() {
  const [entries, setEntries] = useState([]);
  const [friends, setFriends] = useState([]);
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [friendUsername, setFriendUsername] = useState('');
  const [form, setForm] = useState({
    friendName: '',
    amount: '',
    type: 'lent',
    reason: ''
  });
  const [message, setMessage] = useState('');
  const token = getToken();

  // Fetch Friends List
  useEffect(() => {
    async function fetchFriends() {
      try {
        if (!token) return;
        const data = await get(`${AUTH_API}/friends`, token);
        if (data && data.error) {
          console.error('Error fetching friends:', data.error);
          setFriends([]);
          return;
        }
        setFriends(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching friends:', err);
      }
    }
    fetchFriends();
  }, [token]);

  // Search users for adding friend suggestions
  const searchUsers = async (username) => {
    if (!username) {
      setUserSuggestions([]);
      return;
    }
    try {
      // Use the shared `get` helper so non-JSON responses are handled consistently
      const data = await get(`${AUTH_API}/users/search?username=${encodeURIComponent(username)}`, token);
      if (data && data.error) {
        console.error('Error searching users:', data.error);
        setUserSuggestions([]);
        return;
      }
      setUserSuggestions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error searching users:', err);
      setUserSuggestions([]);
    }
  };

  // Debounce friend search for the Add Friend input
  useEffect(() => {
    const id = setTimeout(() => {
      if (friendUsername && friendUsername.trim()) {
        searchUsers(friendUsername.trim());
      } else {
        setUserSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(id);
  }, [friendUsername, token]);

  // Fetch Entries
  useEffect(() => {
    async function fetchEntries() {
      const data = await get(LENDBORROW_API, token);
      setEntries(data || []);
    }
    fetchEntries();
  }, [token]);

  // Add Friend
  const handleAddFriend = async (e) => {
    e.preventDefault();
    if (!friendUsername.trim()) return setMessage('❌ Enter a username to add.');

    try {
      const res = await post(`${AUTH_API}/friends/add`, { friendUsername }, token);
      if (res.error) return setMessage(res.error || '❌ Failed to add friend.');
      
      setFriends(prev => [res.friend, ...prev]);
      setFriendUsername('');
      setMessage('✅ Friend added successfully!');
    } catch (err) {
      console.error(err);
      console.log('Add friend error:', err);
      setMessage('❌ Error adding friend.');
    }
  };

  // Add Lent/Borrow Entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.friendName.trim() || !form.amount) {
      return setMessage('❌ Please fill all fields.');
    }

    try {
      const result = await post(LENDBORROW_API, { ...form }, token);
      if (result._id) {
        setEntries([result, ...entries]);
        setForm({ friendName: '', amount: '', type: 'lent', reason: '' });
        setMessage('✅ Entry added successfully!');
      } else {
        setMessage(result.error || '❌ Failed to add entry.');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Error adding entry.');
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

  const totalLent = entries.filter(e => e.type === 'lent' && e.status !== 'settled')
    .reduce((a, e) => a + Number(e.amount), 0);
  const totalBorrowed = entries.filter(e => e.type === 'borrowed' && e.status !== 'settled')
    .reduce((a, e) => a + Number(e.amount), 0);
  const unsettled = entries.filter(e => e.status !== 'settled').length;

  return (
    <motion.div 
      className="max-w-4xl mx-auto mt-10 mb-24 p-6 bg-white dark:bg-zinc-800/50 rounded-2xl shadow-lg border dark:border-zinc-700"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-indigo-700 dark:text-indigo-400 text-center">
        💸 Lent & Borrow Tracker
      </h2>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
        <div className="bg-indigo-50 dark:bg-zinc-800 p-4 rounded-xl shadow-sm border dark:border-indigo-600/50">
          <h4 className="font-semibold text-indigo-600 dark:text-indigo-300">Total Lent (Pending)</h4>
          <p className="text-2xl font-bold text-indigo-600">₹{totalLent}</p>
        </div>
        <div className="bg-cyan-50 dark:bg-zinc-800 p-4 rounded-xl shadow-sm border dark:border-cyan-600/50">
          <h4 className="font-semibold text-cyan-600 dark:text-cyan-300">Total Borrowed (Pending)</h4>
          <p className="text-2xl font-bold text-cyan-600">₹{totalBorrowed}</p>
        </div>
        <div className="bg-yellow-50 dark:bg-zinc-800 p-4 rounded-xl shadow-sm border dark:border-yellow-600/50">
          <h4 className="font-semibold text-yellow-600 dark:text-yellow-300">Unsettled</h4>
          <p className="text-2xl font-bold text-yellow-600">{unsettled}</p>
        </div>
      </div>

      {/* Add Friend Section */}
      <motion.div 
        className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-xl shadow-sm mb-6 border dark:border-zinc-700"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
      >
        <h3 className="font-semibold text-lg mb-3 text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
          <UserPlus size={18} /> Add a Friend
        </h3>
        <form onSubmit={handleAddFriend} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Friend's Username"
              value={friendUsername}
              onChange={(e) => setFriendUsername(e.target.value)}
              className="border p-2 rounded w-full dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
              autoComplete="off"
            />
            {/* Suggestions dropdown for Add Friend */}
            {userSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-zinc-700 border dark:border-zinc-600 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                {userSuggestions.map(u => (
                  <button
                    key={u._id || u.id}
                    type="button"
                    onClick={() => { setFriendUsername(u.username); setUserSuggestions([]); }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-600 flex items-center gap-2 dark:text-zinc-200"
                  >
                    {u.username}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Add Friend
          </button>
        </form>
      </motion.div>

      {/* Add Transaction Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-xl shadow-sm mb-6 border dark:border-zinc-700 transition"
      >
        <h3 className="font-semibold text-lg mb-3 text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
          <Plus size={18} /> Add Lent/Borrow Entry
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            name="friendName"
            placeholder="Friend’s Name (or non-friend)"
            value={form.friendName}
            required
            onChange={(e) => setForm({ ...form, friendName: e.target.value })}
            className="border p-2 rounded focus:ring-2 focus:ring-indigo-400 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
          />
          <input
            name="amount"
            type="number"
            placeholder="Amount (₹)"
            value={form.amount}
            required
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="border p-2 rounded focus:ring-2 focus:ring-indigo-400 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
          />
          <select
            name="type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="border p-2 rounded focus:ring-2 focus:ring-indigo-400 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
          >
            <option value="lent">I Lent Money</option>
            <option value="borrowed">I Borrowed Money</option>
          </select>
          <input
            name="reason"
            placeholder="Reason (optional)"
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            className="border p-2 rounded focus:ring-2 focus:ring-indigo-400 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 mt-4 text-white font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 w-full"
        >
          Add Entry
        </button>
      </form>

      {message && (
        <p className={`text-center mb-4 font-medium ${
          message.startsWith('✅') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}>{message}</p>
      )}

      {/* Friend List Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3 text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
          <Users size={18} /> Your Friends
        </h3>
        {friends.length === 0 ? (
          <p className="text-gray-500 dark:text-zinc-400">No friends added yet.</p>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {friends.map(f => (
              <li key={f._id} className="bg-indigo-50 dark:bg-zinc-700 p-2 rounded text-center text-indigo-700 dark:text-indigo-300 font-medium">
                {f.username}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Entries List */}
      <div className="space-y-3">
        {entries.length === 0 && (
          <p className="text-gray-500 dark:text-zinc-400 text-center italic py-4">
            No records yet. Add your first entry above!
          </p>
        )}
        {entries.map(e => (
          <motion.div
            key={e._id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className={`p-4 rounded-xl shadow-sm border-l-4 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center hover:shadow-md ${
              e.type === 'lent' 
              ? 'border-indigo-500 bg-indigo-50 dark:bg-zinc-800 dark:border-indigo-600' 
              : 'border-cyan-500 bg-cyan-50 dark:bg-zinc-800 dark:border-cyan-600'
            }`}
          >
            <div className="flex flex-col">
              <span className="font-semibold text-lg">
                {e.type === 'lent' ? (
                  <>💰 Lent to {e.friendName}</>
                ) : (
                  <>🧾 Borrowed from {e.friendName}</>
                )}
              </span>
              <span className="text-gray-600 dark:text-zinc-300 font-medium">₹{e.amount}</span>
              <span className="text-sm text-gray-500 dark:text-zinc-400">
                <Clock className="inline w-4 h-4 mr-1" /> {new Date(e.date).toLocaleDateString()}
              </span>
              {e.reason && (
                <span className="text-sm text-gray-600 dark:text-zinc-400 mt-1">Reason: {e.reason}</span>
              )}
              <span className={`font-medium mt-1 ${e.status === 'settled' ? 'text-green-600' : 'text-orange-600'}`}>
                Status: {e.status}
              </span>
            </div>
            <div className="mt-3 sm:mt-0 flex gap-4">
              {e.status !== 'settled' && (
                <button
                  onClick={() => handleSettle(e._id)}
                  className="text-green-600 font-medium hover:text-green-700"
                >
                  <CheckCircle2 className="inline w-4 h-4 mr-1" /> Settle
                </button>
              )}
              <button
                onClick={() => handleDelete(e._id)}
                className="text-red-600 font-medium hover:text-red-700"
              >
                <Trash2 className="inline w-4 h-4 mr-1" /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
