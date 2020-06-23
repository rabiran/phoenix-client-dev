import axios from 'axios';
export const FETCH_DEPTH = 2;
const BASE_URL = '/api/persons';

const instance = axios.create({
  baseURL: BASE_URL,
});

/**
 * Get all persons
 */
const fetchAll = async () => {
  return (await instance.get()).data;
};

/**
 * Fetch person by id
 * @param {string} id 
 */
const fetchByPersonalNumber = async (id) => {
  return (await instance.get(`/personalNumber/${id}`)).data;
};

/**
 * Update Person
 * @param {string} personId person id to update
 * @param {object} personUpdate Object with changed fields
 */
const updatePerson = async (personId, personUpdate) => {
  return (await instance.put(`/${personId}`, { ...personUpdate }));
};

/**
 * Update directGroup for person
 * @param {string} personId person id to update
 * @param {string} newGroupId new id's group  
 */
const updateDirectGroup = async (personId, newGroupId) => {
  return (await instance.put(`/${personId}/assign`, {group: newGroupId}));
};

export default {
  updateDirectGroup,
  updatePerson,
  fetchAll,
  fetchByPersonalNumber,
}
