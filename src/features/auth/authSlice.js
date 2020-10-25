import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const { user } = action.payload;
      state.user = user;
    },
    loginError: {
      prepare: (errorPayload) => ({
        payload: errorPayload,
        error: true
      }),
      reducer: (state, action) => {
        state.error = action.payload;
      }
    }
  }
});

// selectors
export const selectUser = state => state.auth.user;
export const selectIsError = state => !!state.auth.error;
export const selectIsAuthenticated = state => !!selectUser(state);

// actions
export const {
  loginSuccess,
  loginError
} = authSlice.actions;

export default authSlice;
