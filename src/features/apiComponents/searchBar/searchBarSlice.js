import { createSlice, createSelector } from '@reduxjs/toolkit';
import { createIdMap } from 'utils/slice.helpers';

const initialState = {
  loading: false,
  error: null,
  success: null,
};

const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    loadPersonLoading(state) {
      state.loading = true;                  
    },
    loadPersonError(state, action){
      state.error = action.payload.error;
      state.success = false;
      state.loading = false;      
    },
    loadPersonSuccess(state, action){
      state.error = false;
      state.success = true;
      state.loading = false;      
    },
  },
});

export const searchBarAction = searchBarSlice.actions;

export default searchBarSlice.reducer;