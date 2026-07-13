import React, { createContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await api.auth.me();
          setUser(userData);
        } catch (error) {
          console.error('Failed to authenticate:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    const data = await api.auth.login({ email, password });
    localStorage.setItem('token', data.token);
    setUser(data);
  };

  const register = async (username, email, password) => {
    const data = await api.auth.register({ username, email, password });
    localStorage.setItem('token', data.token);
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateProgress = async (progress, unlockedAlgorithm) => {
    try {
      const data = await api.progress.update({ progress, unlockedAlgorithm });
      setUser(prev => ({
        ...prev,
        learningProgress: data.learningProgress,
        unlockedAlgorithms: data.unlockedAlgorithms
      }));
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProgress, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
