// Adapt base URLs per your deployment!
const AUTH_API = 'http://localhost:4000/api/auth';
const EXPENSE_API = 'http://localhost:4001/api/expenses';
const LENDBORROW_API = 'http://localhost:4002/api/lendborrow';

export async function post(url, data, token = null) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` })
    },
    body: JSON.stringify(data)
  });
  // Try to parse JSON, but fall back to text for HTML/error pages
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    // Return a structured error so callers can handle it
    return { error: `Invalid JSON response: ${text.substring(0, 200)}`, status: res.status };
  }
}

export async function get(url, token = null) {
  const res = await fetch(url, {
    headers: token ? { "Authorization": `Bearer ${token}` } : {}
  });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    return { error: `Invalid JSON response: ${text.substring(0, 200)}`, status: res.status };
  }
}

export async function put(url, data, token = null) {
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` })
    },
    body: JSON.stringify(data)
  });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    return { error: `Invalid JSON response: ${text.substring(0, 200)}`, status: res.status };
  }
}

export async function _delete(url, token = null) {
  const res = await fetch(url, {
    method: "DELETE",
    headers: token ? { "Authorization": `Bearer ${token}` } : {}
  });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    return { error: `Invalid JSON response: ${text.substring(0, 200)}`, status: res.status };
  }
}

export { AUTH_API, EXPENSE_API, LENDBORROW_API };
