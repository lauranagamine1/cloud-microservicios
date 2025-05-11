const API = 'http://localhost:9000/api';

export const searchBooks = async (q) => {
  const res = await fetch(`${API}/search?q=${q}`);
  return res.json();
};

export const registerUser = async (data) => {
  const res = await fetch(`${API}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
};
