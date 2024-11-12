import { AxiosInstance } from "axios";
import { useAuth } from "../context/auth-context";
import { generateToken } from "./token";

const useInterceptor = (axiosInstance: AxiosInstance) => {
  const { authToken, setAuthToken } = useAuth();

  axiosInstance.interceptors.request.use(
    (config) => {
      if (authToken) {
        config.headers["Authorization"] = `Bearer ${authToken}`;
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
