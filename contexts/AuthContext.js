import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const value = {
    currentUser,
    setCurrentUser,
    admin,
    loading,
    setLoading,
    setAdmin,
    // login,
    // register,
    // logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
