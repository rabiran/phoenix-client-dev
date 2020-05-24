import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  error: null
}

const SLICE_NANE = 'errors';

const 

const errorSlice = createSlice({
  name: 'errors',
  re
})

export function errorReducer(state = initialState, action) {
  const { error } = action;
  return error ? { error } : state;
}