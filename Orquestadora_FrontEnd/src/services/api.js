const API = 'http://orquestadora-alb-1826496426.us-east-1.elb.amazonaws.com';

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
