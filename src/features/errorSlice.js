import { createAction } from '@reduxjs/toolkit'

export const SLICE_NANE = 'errors';
export const SHOW_ERROR_FLAG = 'showError';

const initialState = {
  error: null,
  isOpen: false
};

// actions
export const hideError = createAction(`${SLICE_NANE}/hideError`);
export const clearError = createAction(`${SLICE_NANE}/clearError`);
export const setError = createAction(`${SLICE_NANE}/setError`, payload => ({
  payload,
  error: true,
  meta: {
    [SHOW_ERROR_FLAG]: true,
  }
}));

// selectors
export const selectIsOpen = state => state[SLICE_NANE].isOpen;
export const selectErrorObj = state => state[SLICE_NANE].error;

export default function errorReducer(state = initialState, action) {
  const { meta, payload, type } = action;
  if (meta && meta[SHOW_ERROR_FLAG]) {
    return { error: payload, isOpen: true };
  } else if (type === hideError.type) {
    return { ...state, isOpen: false };
  } else if (type === clearError.type) {
    return { ...state, error: null };
  }
  return state;
}
