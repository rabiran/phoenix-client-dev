import { createSlice, createSelector } from '@reduxjs/toolkit';
import mockIntialState from 'api/mockInitialState';

const groupsSlice = createSlice({
  name: 'groups',
  initialState: mockIntialState.groups,
  reducers: {
    fetchGroupsSuccess(state, action) {
      const { groups, upsert } = action.payload;
      let groupsToInsert = groups;
      if(!upsert) {
        groupsToInsert = groups.filter(g => state.byId[g.id]);
      }
      if(groupsToInsert.length > 0) {
        const newChildrenById = createLookup(groups);
        Object.assign(state.byId, ...newChildrenById);  
      }
    },
    fetchChildrenRequest(){},
    subtreeLoaded(state, action) {
      const { id } = action.payload;
      state.subtreeLoaded[id] = true;
    },
    setRootGroupsIds(state, action) {
      const { ids } =  action.payload;
      state.rootGroupsIds = ids;
    }
  },
});

// reducer helpers
const createLookup = groupArr => groupArr.map(g => ({ [g.id]: g }));

// selectors
const getGroups = (state) => state.groups.byId;
export const selectRootGroupsIds = (state) => state.groups.rootGroupsIds;
export const selectRootGroups = createSelector(
  [getGroups, selectRootGroupsIds],
  (groupsByid, rootIds) => rootIds.map(id => groupsByid[id])
);
export const selectGroupByid = (state, id) => getGroups(state)[id];

export const isChildrenDepthExist = (state, id, depth) => {
  if(depth === 0) {
    return !!getGroups(state)[id]
  }
  const group = getGroups(state)[id];
  if(group.children && group.children.length !== 0) {
    return isChildrenDepthExist(state, group.children[0], depth - 1);
  }
  // depth is not 0 and group doesnt have children
  return false;
};

/**
 * Returns whether children of a group exist in the state (I.e were fetched)
 * @param {*} state state tree
 * @param {string} id id of the parent group
 * @returns {boolean}
 */
export const isChildrenFetched = (state, id) => {
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
export const isSubtreeLoaded = (state, id) => {
  return !!state.groups.subtreeLoaded[id];
};

// Actions
export const { 
  /**
   * @param id the id of the group to fetch children for.
   */
  fetchChildrenRequest, 
  /**
   * payload = `{ upsert: bool, groups: Group[] }`
   * @param payload.upsert whether to update groups that are already in the state
   * defaults to `false`
   * @param payload.groups Array of the fetched group objects
   */
  fetchGroupsSuccess,
  /**
   * payload = {id: string}
   * @param payload.id
   */
  subtreeLoaded,
  /**
   * payload = {ids: [string]}
   */
  setRootGroupsIds

} = groupsSlice.actions;

export const fetchSubtreeIfNeeded = id => (dispatch, getState) => {
  if (!isSubtreeLoaded(getState(), id)) {
    return dispatch(fetchChildrenRequest(id));
  }
}

export default groupsSlice.reducer;