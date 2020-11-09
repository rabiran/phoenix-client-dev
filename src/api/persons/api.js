import { fetchGroupMembers } from '../groups/api'
import axoisClient from '../axiosClient';

const BASE_URL = '/api/persons';


/**
 * Get all persons
 */
const fetchAll = async () => {
  return (await axoisClient.get(`${BASE_URL}`)).data;
};

/**
 * Fetch person by id
 * @param {string} personalNumber 
 */
const fetchByPersonalNumber = async (identifier) => {
  return (await axoisClient.get(`${BASE_URL}/identifier/${identifier}`)).data;
};

/**
 * Update Person
 * @param {string} personId person id to update
 * @param {object} personUpdate Object with changed fields
 */
const updatePerson = async (personId, personUpdate) => {
  return (await axoisClient.put(`${BASE_URL}/${personId}`, { ...personUpdate })).data;
};

/**
 * Update directGroup for person
 * @param {string} personId person id to update
 * @param {string} newGroupId new id's group  
 */
const updateDirectGroup = async (personId, newGroupId) => {
  return (await axoisClient.put(`${BASE_URL}/${personId}/assign`, {group: newGroupId})).data;
};

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
  updateDirectGroup,
  updatePerson,
  fetchAll,
  fetchByPersonalNumber,
  fetchById,
  fetchByGroupId
};

export default {
  updateDirectGroup,
  updatePerson,
  fetchAll,
  fetchByPersonalNumber,
  fetchById,
  fetchByGroupId
}
