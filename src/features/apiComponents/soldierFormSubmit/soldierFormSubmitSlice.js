import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: {},
  data: {},
};

const soldierFormSubmitSlice = createSlice({
  name: 'soldierFormSubmit',
  initialState,
  reducers: {
    updateSoldierLoading(state) {
      state.loading = true;
    },
    updateSoldierError(state, { type, payload }) {
      state.error = payload.error;
      state.loading = false;
    },
    updateSoldierSuccess(state, { type, payload }) {
      state.data = payload.person;
      state.loading = false;
    },
  },
});

export const { updateSoldierLoading, updateSoldierError, updateSoldierSuccess } = soldierFormSubmitSlice.actions;

export default soldierFormSubmitSlice.reducer;