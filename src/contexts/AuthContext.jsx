import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Hardcoded admin credentials
    if (email === "admin@example.com" && password === "admin123") {
      setUser({ 
        email: "admin@example.com", 
        name: "Admin",
        role: "admin"
      });
      return true;
    }
    return false; // Login failed
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Add this custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};