import axios from "axios";
import * as constants from "@/assets/js/constants";

const httpClient = axios.create({
  baseURL: constants.API_BASE_URL,
  timeout: 10000,
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
