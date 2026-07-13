const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

export const api = {
  auth: {
    register: async (userData) => {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to register');
      return data;
    },
    login: async (credentials) => {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to login');
      return data;
    },
    me: async () => {
      const response = await fetch(`${BASE_URL}/auth/me`, {
        headers: getHeaders()
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to get user');
      return data;
    }
  },
  progress: {
    update: async (progressData) => {
      const response = await fetch(`${BASE_URL}/progress/update`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(progressData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to update progress');
      return data;
    },
    get: async () => {
      const response = await fetch(`${BASE_URL}/progress`, {
        headers: getHeaders()
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch progress');
      return data;
    }
  }
};
