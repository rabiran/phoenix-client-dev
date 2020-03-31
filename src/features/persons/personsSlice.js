import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  byId: {
    '1': {
      id: '1',
      name: 'אלעד בירן כבודו',
    },
    '2': {
      id: '2',
      name: 'אז מי אני בכלל?'
    },
    '3': {
      id: '3',
      name: 'בירה קורונה'
    },
    '4': {
      id: '4',
      name: 'נשר מאלט'
    },
    '5': {
      id: '5',
      name: 'עוגת מצות עם קוקוס'
    },
    '6': {
      id: '6',
      name: 'שוקולד מריר'
    }
  },
  byDirectGroup: {
    '5e56858e4203fc40043591a5': {
      items: ['1', '2']
    },
    '5e80998fe0673d70cf93cf10': {
      items: ['3', '4']
    },
    '5e80c438e0673d70cf93cf11': {
      items: ['5', '6']
    }
  }
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

export const selectIsLoadingByGroupId = createSelector(byGroupId, 
  byGroupIdMap => !!byGroupIdMap && byGroupIdMap.isFetching);

export const {
  /**
   * payload = { groupId, persons }
   */
  fetchByGroupIdSuccess,
  /**
   * @param groupId the group id to fetch members of
   * dispatched payload = { id: groupId }
   */
  fetchByGroupId
} = personsSlice.actions;

export const fetchByGroupIdIfNeeded = groupId => (state, dispatch) => {
  if(!byGroupId(state, groupId)) {
    dispatch(fetchByGroupId(groupId));
  }
}

export default personsSlice.reducer;