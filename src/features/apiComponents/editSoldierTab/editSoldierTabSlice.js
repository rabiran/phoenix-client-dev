import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  fetchInProgress: false,
  updateInProgress: false,
  openDialog: false,
  searchSoldierError: {},
  updateSoldierError: {},
  person: {},
};

const sliceName = 'editSoldierTab';

/**
 * Actions and reducers for editSoldier component
 */
const editSoldierTabSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    // Indicate search soldier
    fetchSoldierRequest(state) {
      state.fetchInProgress = true;
    },
    // Set data (soldier object) from Kartoffel
    fetchSoldierSuccess(state, { payload }) {
      state.person = payload;
      state.fetchInProgress = false;
      state.searchSoldierError = false;
    },
    // Error from kartoffel if dont find soldier
    fetchSoldierError: {
      reducer: (state, { payload }) => {
        state.searchSoldierError = payload;
        state.fetchInProgress = false;
      },
      prepare: (payload) => ({ payload, error: true }),
    },
    // Indicate update soldier 
    updateSoldierRequest(state) {
      state.updateInProgress = true;
    },
    // Save data (soldier Object) from Kartoffel
    updateSoldierSuccess(state, { payload }) {
      state.person = payload;
      state.openDialog = true;
      state.updateInProgress = false;
    },
    // Error from kartoffel if accur error  
    updateSoldierError: {
      reducer: (state, { payload }) => {
        state.updateSoldierError = payload;
        state.updateInProgress = false;
      },
      prepare: (payload) => ({ payload, error: true }),
    },
    // Reset state
    resetData(state) {
      for(const key in initialState) {
        state[key] = initialState[key]
      }
    },
  },
});

// selectors

const root = key => state => state.components[sliceName][key];

export const selectPerson = root('person');
export const selectErrors = createSelector(
  root('searchSoldierError'),
  root('updateSoldierError'),
  (searchSoldierError, updateSoldierError) => ({ searchSoldierError, updateSoldierError })
);
export const getLoadings = selectErrors;
export const getOpenDialog = store => store.components.editSoldierTab.openDialog;

export const selectIsFetching = root('fetchInProgress');
export const selectIsUpdating = root('updateInProgress');

export const {
  fetchSoldierRequest,
  fetchSoldierSuccess,
  fetchSoldierError,
  updateSoldierRequest,
  updateSoldierError,
  updateSoldierSuccess,
  resetData
} = editSoldierTabSlice.actions;


export default editSoldierTabSlice.reducer;

