import axios from "axios";

const service = axios.create({
  baseURL: "/v1",
  timeout: 1000,
});

service.interceptors.response.use(
  resp => resp.data,
  error => {
    ElMessage({
      message: error,
      type: "error",
    });
  },
);

export default service;
