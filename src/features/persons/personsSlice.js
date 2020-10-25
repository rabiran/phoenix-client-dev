import { createSlice, createSelector } from '@reduxjs/toolkit';
import { createIdMap } from 'utils/slice.helpers';
import { SHOW_ERROR_FLAG } from 'features/errorSlice';

const initialState = {
  byId: {},
  byDirectGroup: {}
};

const personsSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    fetchByGroupIdSuccess(state, action) {
      const { groupId, persons } = action.payload;
      const newPersonsIdMap = createIdMap(persons);
      Object.assign(state.byId, newPersonsIdMap);
      state.byDirectGroup[groupId] = {
        isFetching: false,
        error: false,
        items: persons.map(p => p.id),
      };
    },
    fetchByGroupId: {
      reducer: (state, action) => {
        const { id: groupId } = action.payload;
        state.byDirectGroup[groupId] = {
          isFetching: true, // OR just assume that if the object doesnt exist - it is loading
          error: false,
          items: [],
        }
      },
      prepare: groupId => ({ payload: { id: groupId }})
    },
    fetchByGroupIdError: {
      reducer: (state, action) => {
        const { groupId } = action.meta;
        state.byDirectGroup[groupId] = {
          isFetching: false,
          error: true,
          items: [],
        }
      },
      prepare: (groupId, errorPayload) => ({ 
        payload: errorPayload ,
        meta: { 
          groupId,
          [SHOW_ERROR_FLAG]: true,
        },
        error: true 
      })
    }

  }
});

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

export const selectIsErrorByGroupId = createSelector(byGroupId, 
  byGroupIdMap => byGroupIdMap && byGroupIdMap.error);


export const {
  /**
   * payload = { groupId: string, persons: Person[] }
   */
  fetchByGroupIdSuccess,
  /**
   * @param groupId the group id to fetch members of
   * dispatched payload = { id: groupId }
   */
  fetchByGroupId,
  /**
   * @param groupId the id of the group which fetch requset failed.
   */
  fetchByGroupIdError
} = personsSlice.actions;

export const fetchByGroupIdIfNeeded = groupId => (dispatch, getState) => {
  const state = getState();
  if(!byGroupId(getState(), groupId) || selectIsErrorByGroupId(state, groupId)) {
    dispatch(fetchByGroupId(groupId));
  }
}

export default personsSlice.reducer;