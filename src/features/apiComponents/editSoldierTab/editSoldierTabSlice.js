import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fetchInProgress: false,
  updateInProgress: false,
  openDialog: false,
  searchSoldierError: {},
  updateSoldierError: {},
  person: {},
};

/**
 * Actions and reducers for editSoldier component
 */
const editSoldierTabSlice = createSlice({
  name: 'editSoldierTab',
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
    },
    // Error from kartoffel if dont find soldier
    fetchSoldierError: {
      reducer: (state, { payload }) => {
        state.searchSoldierError = payload;
        state.fetchInProgress = false;
      },
      prepare: ({payload}) => ({ payload, error: true }),
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
      prepare: ({payload}) => ({ payload, error: true }),
    },
    // Reset state
    resetData(state) {
      state.fetchInProgress = false;
      state.updateInProgress = false;
      state.openDialog = false;
      state.searchSoldierError = {};
      state.updateSoldierError = {};
      state.person = {};
    },
  },
});

// selectors

export const getPerson = store => {
  return store.components.editSoldierTab.person
}; 
export const getLoadings = store => {
  const {fetchInProgress, updateInProgress} = store.components.editSoldierTab;
  return {fetchInProgress, updateInProgress};
};
export const getErrors = store => {
  const {searchSoldierError, updateSoldierError} = store.components.editSoldierTab;
  return {searchSoldierError, updateSoldierError};
};
export const getOpenDialog = store => store.components.editSoldierTab.openDialog;

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

