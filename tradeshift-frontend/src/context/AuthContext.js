import React, { createContext, useState, useEffect } from "react";
import api from "../api/axiosConfig"; // ✅ import axios instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);


  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      setIsAuthenticated(false);
    }
  }, [token]);

  // ✅ LOGIN: set token + axios header instantly
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    setToken(newToken);
    setIsAuthenticated(true);
  };

  // ✅ LOGOUT: clear everything cleanly
  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
