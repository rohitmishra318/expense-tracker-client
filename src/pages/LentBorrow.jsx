import { useState, useEffect } from 'react';
import { get, post, put, _delete, LENDBORROW_API } from '../services/api';
import { getToken } from '../services/auth';

export default function LentBorrow() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    friendName: '',
    amount: '',
    type: 'lent',
    reason: ''
  });
  const [message, setMessage] = useState('');
  const token = getToken();

  // Fetch entries
  useEffect(() => {
    async function fetchEntries() {
      const data = await get(LENDBORROW_API, token);
      setEntries(data || []);
    }
    fetchEntries();
  }, [token]);

  // Handle input changes
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Add entry
  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    const result = await post(LENDBORROW_API, form, token);
    if (result._id) {
      setEntries(entries.concat(result));
      setForm({ friendName: '', amount: '', type: 'lent', reason: '' });
      setMessage('Entry added!');
    } else {
      setMessage(result.error || 'Failed to add.');
    }
  };

  // Mark as settled
  const handleSettle = async id => {
    const result = await put(`${LENDBORROW_API}/${id}`, { status: 'settled' }, token);
    setEntries(entries.map(e => (e._id === id ? result : e)));
  };

  // Delete entry
  const handleDelete = async id => {
    await _delete(`${LENDBORROW_API}/${id}`, token);
    setEntries(entries.filter(e => e._id !== id));
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Lent/Borrowed Money</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
        <input name="friendName" placeholder="Friend's Name" value={form.friendName} required onChange={handleChange} className="border p-2 rounded"/>
        <input name="amount" type="number" placeholder="Amount" value={form.amount} required onChange={handleChange} className="border p-2 rounded"/>
        <select name="type" value={form.type} onChange={handleChange} className="border p-2 rounded">
          <option value="lent">Lent</option>
          <option value="borrowed">Borrowed</option>
        </select>
        <input name="reason" placeholder="Reason" value={form.reason} onChange={handleChange} className="border p-2 rounded"/>
        <button type="submit" className="bg-indigo-600 text-white rounded p-2">Add</button>
      </form>
      {message && <p className="mb-2 text-indigo-600">{message}</p>}

      <ul>
        {entries.length === 0 && <li>No entries yet!</li>}
        {entries.map(e => (
          <li key={e._id} className="mb-2 flex flex-col bg-gray-100 p-2 rounded">
            <span>
              <b>{e.type === 'lent' ? 'Lent to' : 'Borrowed from'}:</b> {e.friendName} — ₹{e.amount}
            </span>
            <span>Date: {new Date(e.date).toLocaleDateString()}</span>
            <span>Reason: {e.reason || '—'}</span>
            <span>Status: <b className={e.status === 'settled' ? 'text-green-600' : 'text-orange-600'}>{e.status}</b></span>
            <div>
              {e.status !== 'settled' && <button onClick={() => handleSettle(e._id)} className="mr-2 text-blue-600">Settle</button>}
              <button onClick={() => handleDelete(e._id)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
