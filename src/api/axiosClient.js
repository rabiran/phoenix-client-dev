import axios from 'axios';

const axoisClient = axios.create({
  // headers: {
  //   // 'Access-Control-Allow-Origin': '*',
  // }
  // withCredentials: true
});

const errorInterceptor = error => {
  const { response, message, stack } = error;
  const status = response?.status;
  const statusText = response?.statusText;
  const data = response?.data;
  return Promise.reject({
    message: data?.message || message,
    status,
    statusText,
    data,
    stack
  });
}

axoisClient.interceptors.response.use(null, errorInterceptor);

export default axoisClient;
