import { useState } from 'react';
import { post, AUTH_API } from '../services/api';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const result = await post(`${AUTH_API}/register`, form);
    if (result.token) {
      localStorage.setItem('token', result.token);
      setMessage('Registration successful! You are logged in.');
    } else {
      setMessage(result.error || 'Registration failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="username" type="text" required placeholder="Username"
          value={form.username} onChange={handleChange} className="border p-2 rounded" />
        <input name="email" type="email" required placeholder="Email"
          value={form.email} onChange={handleChange} className="border p-2 rounded" />
        <input name="password" type="password" required placeholder="Password"
          value={form.password} onChange={handleChange} className="border p-2 rounded" />
        <button type="submit" className="bg-indigo-600 rounded text-white p-2 mt-2">Register</button>
      </form>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
  );
}
