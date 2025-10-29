import { useState } from 'react';
import { post, AUTH_API } from '../services/api';

export default function Login() {
  const [form, setForm] = useState({ emailOrUsername: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const result = await post(`${AUTH_API}/login`, form);
    if (result.token) {
      localStorage.setItem('token', result.token);
      setMessage('Login successful!');
    } else {
      setMessage(result.error || 'Login failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="emailOrUsername" type="text" required placeholder="Email or Username"
          value={form.emailOrUsername} onChange={handleChange} className="border p-2 rounded" />
        <input name="password" type="password" required placeholder="Password"
          value={form.password} onChange={handleChange} className="border p-2 rounded" />
        <button type="submit" className="bg-indigo-600 rounded text-white p-2 mt-2">Login</button>
      </form>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
  );
}
