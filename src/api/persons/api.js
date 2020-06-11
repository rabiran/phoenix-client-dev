import axios from 'axios';
export const FETCH_DEPTH = 2;
const BASE_URL = 'api/persons';

const instance = axios.create({
  baseURL: BASE_URL,
});

const fetchAll = async () => {
  return (await instance.get()).data;
};


const fetchByPersonalNumber = async (id) => {
  return (await instance.get(`/personalNumber/${id}`)).data;
};

const updatePerson = async (personId, personUpdate) => {
  return (await instance.put(`/${personId}`, { ...personUpdate }));
};

const updateDirectGroup = async (personId, newGroupId) => {
  return (await instance.put(`/${personId}/assign`, {group: newGroupId}));
};

export default {
  updateDirectGroup,
  updatePerson,
  fetchAll,
  fetchByPersonalNumber,
}
