import { createContext, useEffect, useState } from "react";
import { refreshLogin } from "../services/login.service";
import { axiosInstance } from "../utils/axios";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [refresh, setRefresh] = useState("");
  console.log("token: ", token);

  const fetchToken = () => {
    return JSON.parse(localStorage.getItem("accessToken")) || false;
  };

  const refreshAccessToken  = async () => {
    const storedRefreshToken = JSON.parse(localStorage.getItem("refreshToken"));

    const res = await refreshLogin(storedRefreshToken);
    const newAccessToken = res.data.accessToken;

    localStorage.setItem("accessToken", JSON.stringify(newAccessToken));
    setToken(newAccessToken);

    return newAccessToken;
  };

  const handleLogin = (res) => {
    const { accessToken, refreshToken } = res.data;
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
    localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    setToken(accessToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken("");

  };

  useEffect(() => {
    setToken(fetchToken());
  }, []);

  useEffect(() => {
  // Tự thêm access token vào mọi request
  const requestInterceptor = axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    }
  );

  // Refresh và thử lại request nếu token hết hạn
  const responseInterceptor = axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      const isUnauthorized = error.response?.status === 401;
      const isRefreshRequest = originalRequest?.url === "/auth/refresh";

      if (isUnauthorized && !originalRequest._retry && !isRefreshRequest) {
        originalRequest._retry = true;

        try {
          const newAccessToken = await refreshAccessToken();

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          handleLogout();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  // Xóa interceptor khi LoginProvider unmount, tránh đăng ký lặp.
  return () => {
    axiosInstance.interceptors.request.eject(requestInterceptor);
    axiosInstance.interceptors.response.eject(responseInterceptor);
  };
}, []);

  return (
    <LoginContext.Provider
      value={{
        token,
        setToken,
        handleLogin,
        handleLogout,
        refresh,
        setRefresh,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
