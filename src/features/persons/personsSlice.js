import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  byId: {},
};

const personsSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    setPersons(state, action) {
      const person = action.payload.person;
      state.byId[person.id] = person;
    },
  },
});

// selectors
export const getPersons = state => state.persons.byId;
/* export const selectRootGroups = createSelector(
  [getGroupMap, selectRootGroupsIds],
  (groupsByid, rootIds) => rootIds.map(id => groupsByid[id])
); */
//export const selectGroupByid = (state, id) => getGroupMap(state)[id];

/* *
 * Returns whether children of a group exist in the state (I.e were fetched)
 * @param {*} state state tree
 * @param {string} id id of the parent group
 * @returns {boolean}
 */
/* export const areChildrenFetched = (state, id) => {
  const parent = selectGroupByid(state, id);
  if (parent.isAleaf) return true;
  if (parent.children && parent.children.length !== 0) {
    // if the first child exists, we can safely assume the rest were fetched as well
    return !!selectGroupByid(state, parent.children[0]);
  }
  // not a leaf and does not have children
  return false;
}; */

/**
 * Returns whether the subtree (of limited depth) that roots in `id` has been loaded.
 * @param {*} state 
 * @param {string} id id of the root group of the subtree to check
 * @returns {boolean}
 */
/* const isSubtreeLoaded = (state, id) => {
  return !!state.groups.subtreeLoaded[id];
}; */

// Actions
export const { setPersons } = personsSlice.actions;

/* *
 * dispatch `fetchChildrenRequest` action for the given `id`, only 
 * if it has not yet disptached with the same `id` before.
 * @param {*} id 
 */
/* export const fetchSubtreeIfNeeded = id => (dispatch, getState) => {
  if (!isSubtreeLoaded(getState(), id)) {
    return dispatch(fetchChildrenRequest({ id }));
  }
} */

export default personsSlice.reducer;