import axiosClient from '../axiosClient';
import axoisClient from '../axiosClient';

const BASE_URL = '/auth';

const getUser = async () => await axoisClient.get(`${BASE_URL}/user`);

export {
  getUser
}

export default {
  getUser
}