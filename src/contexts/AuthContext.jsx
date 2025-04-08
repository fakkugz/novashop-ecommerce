import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    name: "John",
    lastname: "Doe",
    email: "johndoe@novashop.com",
    phone: "123-456-7890",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    country: "USA",
  });

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email, password) => {
    if (email === "johndoe123@novashop.com" && password === "password123") {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error, setError, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
