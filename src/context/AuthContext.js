// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { Auth } from "aws-amplify";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const login = async (email, password) => {
    try {
      const user = await Auth.signIn(email, password);
      const idToken = user.signInUserSession.idToken.jwtToken;
      localStorage.setItem("token", idToken);
      setToken(idToken);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (email, password) => {
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: { email },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const confirmSignUp = async (email, code) => {
    try {
      await Auth.confirmSignUp(email, code);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    await Auth.signOut();
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  const value = {
    token,
    isAuthenticated,
    login,
    register,
    confirmSignUp,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
