import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("tokenUserLog");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("tokenUserLog", token);
    setToken(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("tokenUserLog");
    setToken(null);
    setIsLoggedIn(false);
  };

    const userLog = (user) => {
    setUser(user);
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, token, userLog, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};