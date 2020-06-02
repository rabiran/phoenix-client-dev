import axios from 'axios';

const API_URL = 'api';

const axoisClient = axios.create({
  baseURL: API_URL,
});

const errorInterceptor = error => {
  const { response, message, stack } = error;
  return Promise.reject(response ? response : { message, stack });
}

axoisClient.interceptors.response.use(null, errorInterceptor);

export default axoisClient;


export function addResponseInterceptors(axiosInstance) {
  axiosInstance.interceptors.response.use(
    null,
    errorInterceptor
  );
  return axiosInstance;
}


