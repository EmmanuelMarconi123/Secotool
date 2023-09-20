import { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const TOKEN_KEY = "tokenUserLog";

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      if (tokenHaExpirado(storedToken)) {
        // El token ha expirado, por lo que cerramos sesión
        logout();
      } else {
        // El token aún es válido
        setToken(storedToken);
        setIsLoggedIn(true);
      }
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const tokenHaExpirado = (token) => {
    const tokenDecodificado = jwtDecode(token);
    const fechaExpiracion = tokenDecodificado.exp * 86400000; // Convertir la fecha de expiración a milisegundos
    return Date.now() >= fechaExpiracion;
  };

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
