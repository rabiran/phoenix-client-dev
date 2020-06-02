import { fetchGroupMembers } from '../groups/api'
import axoisClient from '../axiosClient';

const BASE_URL = '/persons';

const fetchById = async id => {
  const res = (await axoisClient.get(`${BASE_URL}/${id}`)).data;
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