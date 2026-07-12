import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '@/lib/api';

const StreamAuthContext = createContext(null);

export function StreamAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('stream_token');
    if (token) {
      authApi.getProfile()
        .then(setUser)
        .catch(() => {
          localStorage.removeItem('stream_token');
          localStorage.removeItem('stream_user');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await authApi.login(email, password);
    localStorage.setItem('stream_token', data.token);
    setUser(data.user);
    return data;
  };

  const register = async (userData) => {
    const data = await authApi.register(userData);
    localStorage.setItem('stream_token', data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('stream_token');
    localStorage.removeItem('stream_user');
    setUser(null);
    window.location.href = '/login';
  };

  const updateUser = (data) => setUser(prev => ({ ...prev, ...data }));

  return (
    <StreamAuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </StreamAuthContext.Provider>
  );
}

export const useStreamAuth = () => useContext(StreamAuthContext);