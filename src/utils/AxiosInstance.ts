import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";


const user = JSON.parse(localStorage.getItem("access_token") || '{}');

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/", 
  timeout: 5000, 
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {

    const accessToken = user?.access_token;
    
    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response?.status === 401) {
      
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;