import { useState, useEffect } from 'react';
import { get, post, put, _delete, EXPENSE_API } from '../services/api';
import { getToken } from '../services/auth';


export default function Tracker() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title: '', amount: '', category: '', date: ''
  });
  const [message, setMessage] = useState('');
  const token = getToken();
  
  // ...imports at the top
const [editId, setEditId] = useState(null);
const [editForm, setEditForm] = useState({ title:'', amount:'', category:'', date:'' });

// Begin editing
const handleEdit = (expense) => {
  setEditId(expense._id);
  setEditForm({
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    date: expense.date.slice(0,10) // YYYY-MM-DD
  });
};

// Save edit
const handleEditSave = async (e) => {
  e.preventDefault();
  const result = await put(`${EXPENSE_API}/${editId}`, editForm, token);
  setExpenses(expenses.map(e => (e._id === editId ? result : e)));
  setEditId(null);
  setMessage('Expense updated!');
};

// Cancel edit
const handleEditCancel = () => {
  setEditId(null);
};

// In your expenses list (replace Delete button line):
{expenses.map(e => (
  <li key={e._id} className="mb-2 flex justify-between items-center">
    {editId === e._id ? (
      <form onSubmit={handleEditSave} className="flex gap-2">
        <input type="text" name="title" value={editForm.title} onChange={ev=>setEditForm(f=>({...f, title:ev.target.value}))} required className="border p-1 w-20"/>
        <input type="number" name="amount" value={editForm.amount} onChange={ev=>setEditForm(f=>({...f, amount:ev.target.value}))} required className="border p-1 w-20"/>
        <input type="text" name="category" value={editForm.category} onChange={ev=>setEditForm(f=>({...f, category:ev.target.value}))} required className="border p-1 w-20"/>
        <input type="date" name="date" value={editForm.date} onChange={ev=>setEditForm(f=>({...f, date:ev.target.value}))} required className="border p-1 w-28"/>
        <button type="submit" className="text-green-600">Save</button>
        <button type="button" onClick={handleEditCancel} className="text-gray-600">Cancel</button>
      </form>
    ) : (
      <>
        <span>
          <b>{e.title}</b> - ₹{e.amount} ({e.category}, {new Date(e.date).toLocaleDateString()})
        </span>
        <div>
          <button className="ml-3 text-blue-600" onClick={()=>handleEdit(e)}>Edit</button>
          <button className="ml-2 text-red-600" onClick={()=>handleDelete(e._id)}>Delete</button>
        </div>
      </>
    )}
  </li>
))}

  // Fetch all expenses
  useEffect(() => {
    async function fetchExpenses() {
      const data = await get(EXPENSE_API, token);
      setExpenses(data);
    }
    fetchExpenses();
  }, [token]);

  // Handle input changes
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Submit new expense
  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    const result = await post(EXPENSE_API, form, token);
    if (result._id) {
      setExpenses(expenses.concat(result));
      setForm({ title: '', amount: '', category: '', date: '' });
      setMessage('Expense added!');
    } else {
      setMessage(result.error || 'Failed to add.');
    }
  };

  // Delete expense
  const handleDelete = async id => {
    await _delete(`${EXPENSE_API}/${id}`, token);
    setExpenses(expenses.filter(e => e._id !== id));
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">My Expenses</h2>
      
      {/* Add new expense */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
        <input name="title" placeholder="Title" value={form.title} required onChange={handleChange} className="border p-2 rounded"/>
        <input name="amount" type="number" placeholder="Amount" value={form.amount} required onChange={handleChange} className="border p-2 rounded"/>
        <input name="category" placeholder="Category" value={form.category} required onChange={handleChange} className="border p-2 rounded"/>
        <input name="date" type="date" value={form.date} required onChange={handleChange} className="border p-2 rounded"/>
        <button type="submit" className="bg-indigo-600 text-white rounded p-2">Add</button>
      </form>
      {message && <p className="mb-2 text-indigo-600">{message}</p>}

      {/* List expenses */}
      <ul>
        {expenses.length === 0 && <li>No expenses yet!</li>}
        {expenses.map(e => (
          <li key={e._id} className="mb-2 flex justify-between items-center">
            <span>
              <b>{e.title}</b> - ₹{e.amount} ({e.category}, {new Date(e.date).toLocaleDateString()})
            </span>
            <button onClick={() => handleDelete(e._id)} className="ml-4 text-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
