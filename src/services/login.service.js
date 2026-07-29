import { axiosInstance } from "../utils/axios";

export const postLogin = (username, password) => {
  return axiosInstance.post(`/auth/login`, {
    username,
    password,
    expiresInMins: 3000,
  });
};

export const getLogin = () => {
  return axiosInstance.get(`/auth/me`);
};

export const refreshLogin = (token) => {
  return axiosInstance.post(`/auth/refresh`, {
    refreshToken: token,
    expiresInMins: 3000,
  });
};
