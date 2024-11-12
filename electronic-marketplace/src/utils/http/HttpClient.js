import axios from "axios";

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
      if (axios.isCancel(error)) {
        console.info("Request was cancelled");
      } else if (error.response) {
        console.error("Request failed with error", error.response.statusText);
      } else {
        console.error("Unexpected error occurred", error.message);
      }
      return Promise.reject(error);
    }
  }
}
