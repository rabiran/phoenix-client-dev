import { createAction } from '@reduxjs/toolkit'

export const SLICE_NANE = 'errors';

const initialState = {
  error: null,
  isOpen: false
};

// actions
export const hideError = createAction(`${SLICE_NANE}/hideError`);
export const setError = createAction(`${SLICE_NANE}/setError`, payload => ({
  payload,
  error: true,
}));

// selectors
export const selectIsOpen = state => state[SLICE_NANE].isOpen;
export const selectErrorObj = state => state[SLICE_NANE].error;

export default function errorReducer(state = initialState, action) {
  const { error, payload } = action;
  if (error) {
    return { error: payload, isOpen: true };
  } else if (action.type === hideError.type) {
    return { ...state, isOpen: false };
  }
  return state;
}
