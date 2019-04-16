import { createSelector } from 'reselect';

export const commentsSelector = createSelector(
  state => state.comments,
  comments => comments,
);
