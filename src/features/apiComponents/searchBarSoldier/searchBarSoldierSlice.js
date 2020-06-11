import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: {},
  data: {},
};

const searchBarSoldierSlice = createSlice({
  name: 'searchBarSoldier',
  initialState,
  reducers: {
    loadSoldierLoading(state) {
      state.loading = true;
    },
    loadSoldierError(state, { type, payload }) {
      state.error = payload.error;
      state.loading = false;
    },
    loadSoldierSuccess(state, { type, payload }) {
      state.data = payload.person;
      state.loading = false;
    },
  },
});

export const { loadSoldierLoading, loadSoldierError, loadSoldierSuccess } = searchBarSoldierSlice.actions;

export default searchBarSoldierSlice.reducer;