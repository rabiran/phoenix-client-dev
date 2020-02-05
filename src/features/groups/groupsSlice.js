import { createSlice, createSelector } from '@reduxjs/toolkit';
// import mockIntialState from '../../api/mockInitialState';
import mockIntialState from 'api/mockInitialState';

const groupsSlice = createSlice({
  name: 'groups',
  initialState: mockIntialState.groups,
  reducers: {
    fetchGroupsSuccess(state, action) {
      const { groups } = action.payload;
      const newChildrenById = createLookup(groups);
      // const newChildrenIds = children.map(c => c.id);
      Object.assign(state.byId, ...newChildrenById);
      // state.byId[parentId].children = newChildrenIds;
    },
    fetchChildrenRequest(){}
  },
});

// reducer helpers
const createLookup = groupArr => groupArr.map(g => ({ [g.id]: g }));
// const 

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
  fetchGroupsSuccess
} = groupsSlice.actions;
export default groupsSlice.reducer;