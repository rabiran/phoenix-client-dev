import { createSlice, createSelector } from '@reduxjs/toolkit';

// const initialState = {
//   byId: {
//     '1': {
//       id: '1',
//       name: 'אלעד בירן כבודו',
//     },
//     '2': {
//       id: '2',
//       name: 'אז מי אני בכלל?'
//     }
//   },
//   byDirectGroup: {}
// }

const initialState = {
  byId: {},
  byDirectGroup: {}
}

const personsSlice = createSlice({
  name: 'persons',
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

// selectors
const byId = (state) => state.persons.byId;

const byGroupId = (state, id) => state.persons.byDirectGroup[id];

export const selectById = (state, id) => byId(state)[id];

/**
 * @param state
 * @param groupId id of the group to select members' ids from
 */
export const selectIdsByGroupId = createSelector(byGroupId, 
  byGroupIdMap => byGroupIdMap ? byGroupIdMap.items : null);

/**
 * @param state
 * @param groupId id of the group to select members of
 */
export const selectPersonsByGroupId = createSelector(byId, byGroupId,
  (byId, byDirectGroup) => byDirectGroup ? byDirectGroup.items.map(personId => byId[personId]) : []);

/**
 * @param state
 * @param groupId id of the group to get loading status for its members
 */
export const selectIsLoadingByGroupId = createSelector(byGroupId, 
  byGroupIdMap => !byGroupIdMap || byGroupIdMap.isFetching);

export const {
  /**
   * payload = { groupId: string, persons: Person[] }
   */
  fetchByGroupIdSuccess,
  /**
   * @param groupId the group id to fetch members of
   * dispatched payload = { id: groupId }
   */
  fetchByGroupId
} = personsSlice.actions;

export const fetchByGroupIdIfNeeded = groupId => (dispatch, getState) => {
  if(!byGroupId(getState(), groupId)) {
    dispatch(fetchByGroupId(groupId));
  }
}

export default personsSlice.reducer;