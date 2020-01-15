import { mockIntialState } from '../store';

const groups = (state = mockIntialState.groups, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default groups;
