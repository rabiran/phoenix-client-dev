import axios from 'axios';
import rootGroup from './rootGroup';
export const FETCH_DEPTH = 2;
const BASE_URL = 'api/organizationGroups';

const instance = axios.create({
  baseURL: BASE_URL,
});

/**
 * 
 * @param {string} rootIds 
 */
// export const fetchGroupChildren = async (rootIds) => {
//   return await fetchChildren(rootIds, 1);
// }

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
  const children = (await instance.get(`/${parentId}/subgroups?maxDepth=${depth}`)).data;
  return children.map(groupFromApiResponse);
};

/**
 * 
 * @param {string | object} parentId parent group id or object
 * @param {number} depth 
 */
// const fetchChildren = async (parentId, depth = 1) => {
//   const parent = await fetchGroupById(parentId);
//   // base case: return the group itself
//   if (depth === 0 || parent.isAleaf) {
//     // remove 'children' array (useful for redux state)
//     return [removeChildren(parent)];
//   }
//   // fetch children recursively, flatten results
//   const offspring =  _.flatten(await Promise.all(parent.children.map(id => fetchChildren(id, depth - 1))));
  
//   // return the parent with it's offspring
//   return [parent].concat(offspring);
// }

const fetchGroupById = async id => {
  const res = (await instance.get(`/${id}`)).data
  return groupFromApiResponse(res);
}; 

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
};

export default {
  fetchAll,
  getRootGroupId,
  fetchGroupById,
  fetchSubtree
}