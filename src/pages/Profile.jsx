import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { getToken, removeToken } from '../services/auth';

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decoded = jwt_decode(token);
      setProfile(decoded);
    }
  }, []);

  function handleLogout() {
    removeToken();
    window.location.href = '/login';
  }

  return (
    <div className="max-w-xl mx-auto mt-12 mb-24 p-6 bg-white rounded shadow text-center">
      <h2 className="text-2xl font-bold mb-2">User Profile</h2>
      {!profile && <p>Login to view your profile.</p>}
      {profile && (
        <div>
          <p><b>Username:</b> {profile.username}</p>
          <p><b>UserID:</b> {profile.id}</p>
          <button className="bg-red-600 text-white rounded px-4 py-2 mt-5" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
