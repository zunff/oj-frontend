import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { ElMessage } from "element-plus";

// 创建axios实例
const request: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || "http://localhost:8101/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 从localStorage获取token
    const token = localStorage.getItem("user_login_token");
    if (token && config.headers) {
      config.headers.user_login_token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;

    // 如果响应成功但业务状态码不是0，显示错误信息
    if (data.code !== 0) {
      ElMessage.error(data.message || "请求失败");
      return Promise.reject(new Error(data.message || "请求失败"));
    }

    return data;
  },
  (error) => {
    // 处理HTTP错误
    let message = "网络错误";

    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          message = "未授权，请重新登录";
          // 清除token并跳转到登录页
          localStorage.removeItem("user_login_token");
          window.location.href = "/user/login";
          break;
        case 403:
          message = "拒绝访问";
          break;
        case 404:
          message = "请求地址出错";
          break;
        case 500:
          message = "服务器内部错误";
          break;
        default:
          message = data?.message || `请求失败: ${status}`;
      }
    } else if (error.request) {
      message = "网络连接失败";
    } else {
      message = error.message;
    }

    ElMessage.error(message);
    return Promise.reject(error);
  }
);

export default request;
