import axoisClient from '../axiosClient';

const BASE_URL = '/auth';

const getUser = async () => await (await axoisClient.get(`${BASE_URL}/user`)).data;

export {
  getUser
}

export default {
  getUser
}