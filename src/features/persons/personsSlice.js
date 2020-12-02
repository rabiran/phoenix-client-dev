import { createSlice, createSelector } from '@reduxjs/toolkit';
import { insertToIdMap } from 'utils/slice.helpers';
import { SHOW_ERROR_FLAG } from 'features/errorSlice';
import sliceRoot from './sliceRoot';

export const initialState = {
  byId: {},
  byDirectGroup: {},
};

const personsSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    setPerson(state, action) {
      const person = action.payload;
      state.byId[person.id] = person;
    },
    fetchByGroupIdSuccess(state, action) {
      const { groupId, persons } = action.payload;
      insertToIdMap(state.byId, persons);
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
    },
  }
});

// selectors

const root = state => sliceRoot(state).entities

const byId = (state) => root(state).byId;

const byGroupId = (state, id) => root(state).byDirectGroup[id];

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

// helpers


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
  fetchByGroupIdError,
  /**
   * payload = person Object
   */
  setPerson,
} = personsSlice.actions;

export const fetchByGroupIdIfNeeded = groupId => (dispatch, getState) => {
  const state = getState();
  if(!byGroupId(getState(), groupId) || selectIsErrorByGroupId(state, groupId)) {
    dispatch(fetchByGroupId(groupId));
  }
}

export default personsSlice.reducer;