const errorInterceptor = error => {
  const { response, message, stack } = error;
  return Promise.reject(response ? response : { message, stack });
}

export function addResponseInterceptors(axiosInstance) {
  axiosInstance.interceptors.response.use(
    null,
    errorInterceptor
  );
  return axiosInstance;
}
