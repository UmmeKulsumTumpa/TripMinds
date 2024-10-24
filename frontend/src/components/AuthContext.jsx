import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

// Create the context
export const AuthContext = createContext();

// AuthProvider component that wraps around your app and provides the context to all children
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to check if the user is logged in when the app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    }
  }, []);

  // Function to log in the user (store token and update state)
  const login = (token) => {
    const decodedUser = jwtDecode(token);
    localStorage.setItem('token', token);
    setUser(decodedUser);
  };

  // Function to log out the user (remove token and update state)
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
