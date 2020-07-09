import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  byId: {},
};

const personsSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    setPerson(state, action) {
      const person = action.payload.person;
      state.byId[person.id] = person;
    },
  },
});

// selectors
export const getPersons = state => state.persons.byId;

// Actions
export const { setPerson } = personsSlice.actions;

export default personsSlice.reducer;