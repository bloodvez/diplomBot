import axios, { AxiosRequestConfig } from "axios";

const $host = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: 'http://192.168.200.46:5555/',
});

const $authHost = axios.create({
  // baseURL: process.env.REACT_APP_API_URL
  baseURL: 'http://192.168.200.46:5555/',
})

const authInterceptor = (config:AxiosRequestConfig): AxiosRequestConfig => {
  config.headers!.authorization = `Bearer ${localStorage.getItem('accessToken')}`
  return config
}

$authHost.interceptors.request.use(authInterceptor)
export { $host, $authHost };
