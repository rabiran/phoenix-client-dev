import { createSlice } from '@reduxjs/toolkit';
import { SHOW_ERROR_FLAG } from 'features/errorSlice'
import sliceRoot from '../sliceRoot';

const initialState = {
  persons: [],
  fetching: false,
  error: false,
}

const sliceName = 'waitingList';

const waitingListSlice = createSlice({
  initialState,
  name: sliceName,
  reducers: {
    fetchWaitingListOfGroup(state) {
      state.fetching = true;
    },
    /**
     * action payload = { persons: person[] }
     * @param {*} state 
     * @param {*} action 
     */
    fetchWaitingListOfGroupSuccess(state, action) {
      const { persons } = action.payload;
      state.persons = persons;
      state.fetching = false;
      state.error = false;
    },
    fetchWaitingListOfGroupError: {
      reducer: (state) => {
       state.fetching = false;
       state.error = true;
      },
      /**
       * @param errorPayload - the error object
       */
      prepare: (errorPayload) => ({ 
        payload: errorPayload,
        meta: { 
          [SHOW_ERROR_FLAG]: true,
        },
        error: true 
      })
    }
  }
});

const root = state => sliceRoot(state)[sliceName];

export const selectWaitingList = state => root(state).persons;

export const selectIsWaitingListLoading = state => root(state).fetching;

export const actions = waitingListSlice.actions;
export const selectors = {
  selectIsWaitingListLoading,
  selectWaitingList
}

export default waitingListSlice.reducer;
