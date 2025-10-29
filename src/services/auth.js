export function saveToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function removeToken() {
  localStorage.removeItem('token');
}

// ✅ Add this new function
export function logout() {
  removeToken(); // clear stored token
  window.location.href = '/login'; // redirect to login
}
