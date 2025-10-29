// Adapt base URLs per your deployment!
const AUTH_API = 'http://localhost:4000/api/auth';
const EXPENSE_API = 'http://localhost:4001/api/expenses';
const LENDBORROW_API = 'http://localhost:4002/api/lendborrow';

export async function post(url, data, token = null) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` })
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

export async function get(url, token = null) {
  return fetch(url, {
    headers: token ? { "Authorization": `Bearer ${token}` } : {}
  }).then(res => res.json());
}

export async function put(url, data, token = null) {
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` })
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

export async function _delete(url, token = null) {
  return fetch(url, {
    method: "DELETE",
    headers: token ? { "Authorization": `Bearer ${token}` } : {}
  }).then(res => res.json());
}

export { AUTH_API, EXPENSE_API, LENDBORROW_API };
