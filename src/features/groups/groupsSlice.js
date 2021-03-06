import { createSlice, createSelector } from '@reduxjs/toolkit';
import { createIdMap } from 'utils/slice.helpers';

const initialState = {
  byId: {},
  rootGroupsIds: [],
  subtreeLoaded: {},
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    fetchChildrenSuccess(state, action) {
      const { groups, upsert, parentId } = action.payload;
      let groupsToInsert = groups;
      if(!upsert) {
        groupsToInsert = groups.filter(g => !state.byId[g.id]);
      }
      if(groupsToInsert.length > 0) {
        const newChildrenById = createIdMap(groups);
        Object.assign(state.byId, newChildrenById);  
      }
      if(parentId) {
        state.subtreeLoaded[parentId] = true;
      } else {
        state.rootGroupsIds = groupsToInsert.map(g => g.id);
      }
    },
    fetchChildrenRequest(){},
  },
});

// selectors
const getGroupMap = state => state.groups.byId;
export const selectRootGroupsIds = state => state.groups.rootGroupsIds;
export const selectRootGroups = createSelector(
  [getGroupMap, selectRootGroupsIds],
  (groupsByid, rootIds) => rootIds.map(id => groupsByid[id])
);
export const selectGroupByid = (state, id) => getGroupMap(state)[id];

/**
 * Returns whether children of a group exist in the state (I.e were fetched)
 * @param {*} state state tree
 * @param {string} id id of the parent group
 * @returns {boolean}
 */
export const areChildrenFetched = (state, id) => {
  const parent = selectGroupByid(state, id);
  if (parent.isAleaf) return true;
  if (parent.children && parent.children.length !== 0) {
    // if the first child exists, we can safely assume the rest were fetched as well
    return !!selectGroupByid(state, parent.children[0]);
  }
  // not a leaf and does not have children
  return false;
};

/**
 * Returns whether the subtree (of limited depth) that roots in `id` has been loaded.
 * @param {*} state 
 * @param {string} id id of the root group of the subtree to check
 * @returns {boolean}
 */
const isSubtreeLoaded = (state, id) => {
  return !!state.groups.subtreeLoaded[id];
};

// Actions
export const { 
  /**
   * payload = `{ id: string }`
   * @param payload.id the id of the group to fetch children for.
   */
  fetchChildrenRequest, 
  /**
   * payload = `{ upsert: bool, groups: Group[], parentId }`
   * @param payload.upsert whether to update groups that are already in the state
   * defaults to `false`
   * @param payload.groups Array of the fetched group objects
   * @param payload.parentId The id of the group that requested the fetch, 
   * i.e `groups` lowest common ancestor (LCA).
   * if `parentId` not specified - `groups` will be treated as root groups.
   */
  fetchChildrenSuccess,
} = groupsSlice.actions;

/**
 * dispatch `fetchChildrenRequest` action for the given `id`, only 
 * if it has not yet disptached with the same `id` before.
 * @param {*} id 
 */
export const fetchSubtreeIfNeeded = id => (dispatch, getState) => {
  if (!isSubtreeLoaded(getState(), id)) {
    return dispatch(fetchChildrenRequest({ id }));
  }
}

export default groupsSlice.reducer;