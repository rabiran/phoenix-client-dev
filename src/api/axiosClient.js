import axios from 'axios';

const axoisClient = axios.create({
  // headers: {
  //   // 'Access-Control-Allow-Origin': '*',
  // }
  // withCredentials: true
});

const errorInterceptor = error => {
  const { response, message, stack } = error;
  return Promise.reject(response ? response : { message, stack });
}

axoisClient.interceptors.response.use(null, errorInterceptor);

export default axoisClient;
