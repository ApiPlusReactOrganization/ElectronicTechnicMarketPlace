import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { store } from "../../store/store";
import { authUser } from "./../../store/state/reduserSlises/userSlice";
import { logoutUser } from "../../store/state/actions/userActions";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

export default class HttpClient {
  constructor(configs) {
    this.axiosInstance = axios.create({
      baseURL: configs.baseURL,
      timeout: configs.timeout || 3000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...configs.headers,
      },
      ...configs,
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
                return this.axiosInstance(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          isRefreshing = true;

          try {
            const refreshToken = localStorage.getItem("refreshToken");
            const accessToken = localStorage.getItem("accessToken");

            const { data } = await axios.post(
              "http://localhost:5132/account/refresh-token",
              { refreshToken, accessToken }
            );

            if (data) {
              localStorage.setItem("accessToken", data.accessToken);
              localStorage.setItem("refreshToken", data.refreshToken);

              this.setAuthorizationToken(data.accessToken);

              const user = jwtDecode(data.accessToken);
              store.dispatch(authUser(user));

              processQueue(null, data.accessToken);
            } else {
              throw new Error("Failed to refresh tokens");
            }

            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            processQueue(refreshError, null);
            await logoutUser()(store.dispatch);
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  setAuthorizationToken(token) {
    if (token) {
      this.axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    } else {
      delete this.axiosInstance.defaults.headers.common["Authorization"];
    }
  }

  async get(url, config = {}) {
    return this.request({ method: "GET", url, ...config });
  }

  async post(url, data, config = {}) {
    return this.request({ method: "POST", url, data, ...config });
  }

  async put(url, data, config = {}) {
    return this.request({ method: "PUT", url, data, ...config });
  }

  async delete(url, config = {}) {
    return this.request({ method: "DELETE", url, ...config });
  }

  async request(config) {
    try {
      const response = await this.axiosInstance.request(config);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
