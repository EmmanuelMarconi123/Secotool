import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedToken = localStorage.getItem("tokenUserLog");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("tokenUserLog", token);
    setToken(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("tokenUserLog");
    localStorage.removeItem("user");
    setToken(null);
    setIsLoggedIn(false);
    setUser({});
  };

  const userLog = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
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
