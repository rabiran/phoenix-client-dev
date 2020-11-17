import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  error: null
}

export const Responsibility = Object.freeze({
    None: 'none',
    HumanResources: 'HR',
    SecurityOfficer: 'SO',
});

const hasEditorPrivillage = user => {
  return user.responsibility === Responsibility.HumanResources 
    || user.responsibility === Responsibility.SecurityOfficer;
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
export const selectIsUserCanEdit = state => selectIsAuthenticated(state) && hasEditorPrivillage(selectUser(state));

// actions
export const {
  loginSuccess,
  loginError
} = authSlice.actions;

export default authSlice.reducer;
