import axios from "axios";
import {
  setIsLoading,
  setStatus,
} from "../../store/state/actions/appSettingActions";
import { PageStatuses } from "../../store/state/reduserSlises/appSettingSlice";
import { store } from "../../store/store";
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
    setIsLoading(true)(store.dispatch);

    try {
      const response = await this.axiosInstance.request(config);

      setStatus(PageStatuses.GOOD)(store.dispatch);

      return response.data;
    } catch (error) {
      const status = error.response ? error.response.status : 500;

      if (status === 404) {
        setStatus(PageStatuses.NOT_FOUND)(store.dispatch);
      } else if (status === 400) {
        setStatus(PageStatuses.BAD_REQUEST)(store.dispatch);
      } else {
        setStatus(PageStatuses.TOO_MANY_REQUESTS)(store.dispatch);
      }

      return Promise.reject(error);
    } finally {
      setIsLoading(false)(store.dispatch);
    }
  }
}
