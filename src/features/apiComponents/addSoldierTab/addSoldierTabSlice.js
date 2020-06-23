import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loadingSearch: false,
  loadingUpdate: false,
  successUpdate: false,
  errorSearch: {},
  errorUpdate: {},
  data: {},
};

/**
 * Actions and reducers for editSoldier component
 */
const editSoldierTabSlice = createSlice({
  name: 'addSoldierTab',
  initialState,
  reducers: {
    // Indicate search soldier
    loadSoldierLoading(state) {
      state.loadingSearch = true;
    },
    // Error from kartoffel if dont find soldier
    loadSoldierError(state, { type, payload }) {
      state.errorSearch = payload.error;
      state.loadingSearch = false;
    },
    // Set data (soldier object) from Kartoffel
    loadSoldierSuccess(state, { type, payload }) {
      state.data = payload.person;
      state.loadingSearch = false;
    },
    // Indicate update soldier 
    updateSoldierLoading(state) {
      state.loadingUpdate = true;
    },
    // Error from kartoffel if accur error  
    updateSoldierError(state, { type, payload }) {
      state.errorUpdate = payload.error;
      state.loadingUpdate = false;
    },
    // Save data (soldier Object) from Kartoffel
    updateSoldierSuccess(state, { type, payload }) {
      state.data = payload.person;
      state.successUpdate = true;
      state.loadingUpdate = false;
    },
    // Reset state
    resetData(state) {
      state.loadingSearch = false;
      state.loadingUpdate = false;
      state.successUpdate = false;
      state.errorSearch = {};
      state.errorUpdate = {};
      state.data = {};
    },
  },
});

export const {
  loadSoldierLoading,
  loadSoldierError,
  loadSoldierSuccess,
  updateSoldierLoading,
  updateSoldierError,
  updateSoldierSuccess,
  resetData
} = editSoldierTabSlice.actions;

export default editSoldierTabSlice.reducer;
