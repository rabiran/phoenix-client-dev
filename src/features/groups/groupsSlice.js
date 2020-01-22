import { createSlice, createSelector } from '@reduxjs/toolkit';
// import mockIntialState from '../../api/mockInitialState';
import mockIntialState from 'api/mockInitialState';

const groupsSlice = createSlice({
  name: 'groups',
  initialState: mockIntialState.groups,
  reducers: {

  },
});

const getGroups = (state) => state.groups.byId;
const getRootGroupsIds = (state) => state.groups.rootGroupsIds;
export const selectRootGroups = createSelector(
  [getGroups, getRootGroupsIds],
  (groupsByid, rootIds) => rootIds.map(id => groupsByid[id])
);
export const selectGroupByid = (state, id) => getGroups(state)[id];
 

export default groupsSlice.reducer;