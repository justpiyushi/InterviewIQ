import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

export const register = async ({ username, email, password }) => {
  try {
    const response = await api.post("/auth/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    await api.get("/auth/logout", {});
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get("/auth/profile", {});
    return response;
  } catch (error) {
    console.log(error);
  }
};
