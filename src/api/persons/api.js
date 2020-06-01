import axios from 'axios';
import { fetchGroupMembers } from '../groups/api'
import { addResponseInterceptors } from '../axiosHelpers';

const BASE_URL = 'api/persons';

const instance = axios.create({
  baseURL: BASE_URL,
});

addResponseInterceptors(instance);

const fetchById = async id => {
  const res = (await instance.get(`/${id}`)).data;
  return personFromApiResponse(res);
}

const fetchByGroupId = async id => {
  const res = await fetchGroupMembers(id);
  return res.map(personFromApiResponse);
};

const personFromApiResponse = person => {
  const { _id, ...rest } = person;
  return rest;
};

export {
  fetchById,
  fetchByGroupId
};

export default {
  fetchById,
  fetchByGroupId
}