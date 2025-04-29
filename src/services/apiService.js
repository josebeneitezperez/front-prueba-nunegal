import axios from "axios";
import * as constants from "@/assets/js/common/constants";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const httpClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    [constants.CONTENT_TYPE]: constants.CONTENT_TYPE_APPLICATION_JSON,
  },
});

export const apiService = {
  get(url, config = {}) {
    return httpClient.get(url, config);
  },
  post(url, data, config = {}) {
    return httpClient.post(url, data, config);
  },
};
