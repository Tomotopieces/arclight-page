import axios from "axios";

const request = axios.create({
  baseURL: "https://files.hypertention.cn/v1/files",
  timeout: 1000,
});

request.interceptors.response.use(
  resp => resp,
  error => {
    ElMessage({
      message: error,
      type: "error",
    });
  },
);

export default request;
