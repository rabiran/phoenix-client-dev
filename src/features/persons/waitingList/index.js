import { actions, selectors } from './reducer';

export const {
  selectIsWaitingListLoading,
  selectWaitingList
} = selectors;

export const {
  fetchWaitingListOfGroup,
  fetchWaitingListOfGroupSuccess,
  fetchWaitingListOfGroupError
} = actions;
