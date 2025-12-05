// src/api.js
const BASE = 'http://localhost:4000';

export async function getJSON(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status}`);
  }
  return res.json();
}