function getApiUrlPrefix() {
  if (process.env.NODE_ENV === 'test') {
    return process.env.VITE_API_URL || '';
  }
  // Replaced at build time by Vite `define`
  if (typeof __APP_API_URL__ !== 'undefined') {
    return __APP_API_URL__ || '';
  }
  return '';
}

const API_URL = getApiUrlPrefix();

export function getApiUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${API_URL}${p}`;
}

export async function apiGet(path, token) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(getApiUrl(path), { headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || res.statusText);
  return data;
}

export async function apiPost(path, body, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(getApiUrl(path), {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || res.statusText);
  return data;
}

export async function apiPatch(path, body, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(getApiUrl(path), {
    method: 'PATCH',
    headers,
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || res.statusText);
  return data;
}

export async function apiDelete(path, token) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(getApiUrl(path), { method: 'DELETE', headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || res.statusText);
  return data;
}
