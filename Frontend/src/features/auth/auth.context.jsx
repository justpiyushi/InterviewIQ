import { createContext, useState, useEffect } from "react";
import * as authAPI from "./services/auth.api.js";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authAPI.getProfile();
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setLoading, setUser]);

  return (
    <AuthContext.Provider value={{ user, loading, setLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
