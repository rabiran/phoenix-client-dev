import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loadingSearch: false,
  loadingUpdate: false,
  successUpdate: false,
  errorSearch: {},
  errorUpdate: {},
  data: {},
};

const addSoldierTabSlice = createSlice({
  name: 'addSoldierTab',
  initialState,
  reducers: {
    loadSoldierLoading(state) {
      state.loadingSearch = true;
    },
    loadSoldierError(state, { type, payload }) {
      state.errorSearch = payload.error;
      state.loadingSearch = false;
    },
    loadSoldierSuccess(state, { type, payload }) {
      state.data = payload.person;
      state.loadingSearch = false;
    },
    updateSoldierLoading(state) {
      state.loadingUpdate = true;
    },
    updateSoldierError(state, { type, payload }) {
      state.errorUpdate = payload.error;
      state.loadingUpdate = false;
    },
    updateSoldierSuccess(state, { type, payload }) {
      state.data = payload.person;
      state.successUpdate = true;
      state.loadingUpdate = false;
    },
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
} = addSoldierTabSlice.actions;

export default addSoldierTabSlice.reducer;
