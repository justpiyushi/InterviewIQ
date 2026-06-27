import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import * as authAPI from "../services/auth.api.js";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const response = await authAPI.login({ email, password });
      setUser(response.data.user);
      console.log("User: ", response.data.user);
      console.log("User inside handleLogin: ",user);
      return true;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await authAPI.register({ username, email, password });
      setUser(data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const data = await authAPI.logout();
      setUser(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  return { user, loading, handleRegister, handleLogin, handleLogout };
};
