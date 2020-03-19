import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  byId: {},
  byDirectGroup: {}
}

const personsSlice = createSlice({
  initialState,
  reducers: {
    fetchByGroupIdSuccess(state, action) {
      const { groupId, persons } = action.payload;
      const newPersonsByIdArr = createLookup(persons);
      Object.assign(state.byId, ...newPersonsByIdArr);
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

// reducer helpers
const createLookup = personsArr => personsArr.map(p => ({ [p.id]: p }));

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