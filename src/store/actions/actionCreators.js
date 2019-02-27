import { INCREMENT_LIKES, ADD_COMMENT, REMOVE_COMMENT } from '../actionTypes';

// Increment Likes
export const incrementLikes = index => {
  return {
    type: INCREMENT_LIKES,
    index,
  };
};

// Add Comment
export const addComment = (postId, author, comment) => {
  return {
    type: ADD_COMMENT,
    postId,
    author,
    comment,
  };
};

// Remove Comment
export const removeComment = (postId, i) => {
  return {
    type: REMOVE_COMMENT,
    postId,
    i,
  };
};
