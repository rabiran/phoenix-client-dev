import axios from 'axios';
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
 * @param {string} personalNumber 
 */
const fetchByPersonalNumber = async (personalNumber) => {
  return (await instance.get(`/personalNumber/${personalNumber}`)).data;
};

/**
 * Update Person
 * @param {string} personId person id to update
 * @param {object} personUpdate Object with changed fields
 */
const updatePerson = async (personId, personUpdate) => {
  return (await instance.put(`/${personId}`, { ...personUpdate })).data;
};

/**
 * Update directGroup for person
 * @param {string} personId person id to update
 * @param {string} newGroupId new id's group  
 */
const updateDirectGroup = async (personId, newGroupId) => {
  return (await instance.put(`/${personId}/assign`, {group: newGroupId})).data;
};

export default {
  updateDirectGroup,
  updatePerson,
  fetchAll,
  fetchByPersonalNumber,
}
