import axios from 'axios';
import _ from 'lodash';

const BASE_URL = 'api/organizationGroups';

const instance = axios.create({
  baseURL: BASE_URL,
});

/**
 * 
 * @param {string} rootIds 
 */
export const fetchGroupChildren = async (rootIds) => {
  return await fetchChildren(rootIds, 1);
}


export const fetchChildren2 = async (parentId) => {
  const parent = (await instance.get(`/${parentId}`, {
    params: {
      populate: 'children'
    }
  })).data;
  const children = parent.children.map(groupFromApiResponse);
  parent.children = children.map(c => c.id);
  return [parent].concat(children);
}

/**
 * 
 * @param {string | object} parentId parent group id or object
 * @param {*} depth 
 */
const fetchChildren = async (parentId, depth = 1) => {
  const parent = await fetchGroupById(parentId);
  // base case: return the group itself
  if (depth === 0 || parent.isAleaf) {
    // remove 'children' array (useful for redux state)
    return [removeChildren(parent)];
  }
  // fetch children recursively, flatten results
  const offspring =  _.flatten(await Promise.all(parent.children.map(id => fetchChildren(id, depth - 1))));
  
  // return the parent with it's offspring
  return [parent].concat(offspring);
}

const fetchGroupById = async id => {
  const res = (await instance.get(`/${id}`)).data
  return groupFromApiResponse(res);
} 



const removeChildren = group => {
  const { children, ...rest } = group;
  return { ...rest };
}

const groupFromApiResponse = groupFromApi => {
  const { id, name, isALeaf: isAleaf, children } = groupFromApi
  const group = { id, name, isAleaf };
  if(children) group.children = children;
  return group;
}