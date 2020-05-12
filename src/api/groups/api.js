import axios from 'axios';
import rootGroup from './rootGroup';
export const FETCH_DEPTH = 2;
const BASE_URL = 'api/organizationGroups';

const instance = axios.create({
  baseURL: BASE_URL,
});

const fetchAll = async () => {
  return (await instance.get()).data.map(groupFromApiResponse);
};


// export const fetchChildren2 = async (parentId) => {
//   const parent = (await instance.get(`/${parentId}`, {
//     params: {
//       populate: 'children'
//     }
//   })).data;
//   const children = parent.children.map(groupFromApiResponse);
//   parent.children = children.map(c => c.id);

//   return [groupFromApiResponse(parent)].concat(children);
// }

/**
 * fetches the subtree rooted in `parentId`. 
 * subtree depth limited to the supplied `depth`
 * @param {string} parentId - 
 * @param {number} depth 
 */
const fetchSubtree = async (parentId, depth = FETCH_DEPTH) => {
  const children = (await instance.get(`/${parentId}/children?maxDepth=${depth}`)).data;
  return children.map(groupFromApiResponse);
};

const fetchGroupById = async id => {
  const res = (await instance.get(`/${id}`)).data
  return groupFromApiResponse(res);
};

const fetchGroupMembers = async id => {
  const { directMembers } = (await instance.get(`/${id}?populate=directMembers`)).data
  return directMembers;
}

/**
 * stub for now
 */
const getRootGroupId = () => {
  return rootGroup.id;
};

/**
 * Transform group from the server to be stored in the app's state.
 * Returns the transformed group
 * @param {object} groupFromApi - group object
 */
const groupFromApiResponse = groupFromApi => {
  const { id, name, isALeaf: isAleaf, children, hierarchy } = groupFromApi
  const group = { id, name, isAleaf, hierarchy };
  if(children) group.children = children;
  return group;
};



export {
  fetchAll,
  getRootGroupId,
  fetchGroupById,
  fetchSubtree,
  fetchGroupMembers
};

export default {
  fetchAll,
  getRootGroupId,
  fetchGroupById,
  fetchSubtree
}
