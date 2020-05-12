import { createSlice, createSelector } from '@reduxjs/toolkit';
import { createIdMap } from 'utils/slice.helpers';

const initialState = {
  byId: {},
  byDirectGroup: {}
}

const personsSlice = createSlice({
  initialState,
  reducers: {
    fetchByGroupIdSuccess(state, action) {
      const { groupId, persons } = action.payload;
      const newPersonsIdMap = createIdMap(persons);
      Object.assign(state.byId, newPersonsIdMap);
      state.byDirectGroup[groupId] = {
        isFetching: false,
        items: persons.map(p => p.id),
      };
    },
    fetchByGroupId: {
      reducer: (state, action) => {
        const { id: groupId } = action.payload;
        state.byDirectGroup[groupId] = {
          isFetching: true, // OR just assume that if the object doesnt exist - it is loading
          items: [],
        }
      },
      prepare: groupId => ({ payload: { id: groupId }})
    },

  }
});

//selectors
const byGroupId = (state, id) => state.persons.byDirectGroup[id];

export const selectByDirectGroup = createSelector()


export const {
  /**
   * payload = { groupId, persons }
   */
  fetchByGroupIdSuccess,
  /**
   * @param groupId the group id to fetch members of
   * dispatced payload = { id: groupId }
   */
  fetchByGroupId
} = personsSlice.actions;

export const fetchByGroupIdIfNeeded = groupId => (state, dispatch) => {
  if(!byGroupId(state, groupId)) {
    dispatch(fetchByGroupId(groupId));
  }
}