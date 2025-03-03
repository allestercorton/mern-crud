const API_URL =
  import.meta.env.MODE !== 'production'
    ? 'http://localhost:5000/api/v1/users'
    : '/api/v1/users';

export const fetchUsers = async () => {
  const res = await fetch(API_URL, { method: 'GET' });
  return res.json();
};

export const createUser = async (name, age) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, age }),
  });
  return res.json();
};

export const updateUser = async (id, name, age) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, age }),
  });
  return res.json();
};

export const deleteUser = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
