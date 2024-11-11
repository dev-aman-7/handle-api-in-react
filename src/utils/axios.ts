import axios from "axios";
import { useAuth } from "../context/auth-context";
import { generateToken } from "./token";

const useInterceptor = () => {
  const { authToken: token, setAuthToken } = useAuth();

  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response &&
        error.response.status === 404 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const newToken = generateToken();
          console.log(newToken, "newToken");
          setAuthToken(newToken);

          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

          return axiosInstance(originalRequest);
        } catch (tokenError) {
          console.error("Token refresh failed:", tokenError);
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useInterceptor;
