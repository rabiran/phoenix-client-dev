import { createSlice, createSelector } from '@reduxjs/toolkit';
// import mockIntialState from '../../api/mockInitialState';
import mockIntialState from 'api/mockInitialState';

const groupsSlice = createSlice({
  name: 'groups',
  initialState: mockIntialState.groups,
  reducers: {
    fetchChildrenSuccess(state, action) {
      const { parentId, children } = action.payload;
      const newChildrenById = children.map(c => ({
        [c.id]: c,
      }));
      const newChildrenIds = children.map(c => c.id);
      Object.assign(state.byId, ...newChildrenById);
      state.byId[parentId].children = newChildrenIds;
    },
    fetchChildrenRequest(){}
  },
});

// selectors
const getGroups = (state) => state.groups.byId;
const getRootGroupsIds = (state) => state.groups.rootGroupsIds;
export const selectRootGroups = createSelector(
  [getGroups, getRootGroupsIds],
  (groupsByid, rootIds) => rootIds.map(id => groupsByid[id])
);
export const selectGroupByid = (state, id) => getGroups(state)[id];


// Actions
export const { 
  /**
   * @param id the id of the group to fetch children for.
   */
  fetchChildrenRequest, 
  /**
   * payload = { parentId: string, children: [group] }
   * @param payload.parentId the id of the parent group
   * @param payload.children the fetched children group objects
   */
  fetchChildrenSuccess 
} = groupsSlice.actions;
export default groupsSlice.reducer;