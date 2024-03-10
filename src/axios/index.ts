import axios from "axios";

const service = axios.create({
  baseURL: "/v1/files",
  timeout: 3000,
});

service.interceptors.response.use(
  resp => resp.data,
);

export default service;
