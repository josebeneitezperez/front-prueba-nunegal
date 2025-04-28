import axios from "axios";
import * as constants from "@/assets/js/common/constants";

const httpClient = axios.create({
  baseURL: constants.API_BASE_URL,
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
