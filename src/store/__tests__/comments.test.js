/* eslint-env jest */
import { comments as commentsReducer } from '../reducers/comments';
import comments from '../../data/comments';
import { REMOVE_COMMENT, ADD_COMMENT } from '../actionTypes';

describe('Adding a comment', () => {
  const author = 'kingmob';
  const comment = 'This is a test';
  const expected = { user: author, text: comment };

  const addComment = (postId) => {
    const action = { type: ADD_COMMENT, author, comment, postId };
    const allComments = commentsReducer(comments, action);
    return allComments[postId];
  }

  it('should be able to add a new comment to an existing post', () => {
    const postComments = addComment('test');
    expect(postComments[postComments.length - 1]).toEqual(expected);
  });

  it('should be able to add a new comment to a new post', () => {
    const postComments = addComment('123-i-dont-exist');
    expect(postComments[postComments.length - 1]).toEqual(expected);
  });

  it('should increase the length of the array by 1', () => {
    const postComments = addComment('B3eiIwcYV');
    expect(postComments.length).toEqual(comments['B3eiIwcYV'].length + 1);
  });
});

describe('Removing a comment', () => {
  let comment1, comment2, commentState, updateCommentsState, postId;

  beforeAll(() => {
    postId = 'test';
    const action = { type: REMOVE_COMMENT, i: 0, postId };
    comment1 = { text: 'hey!', user: 'kingmob' };
    comment2 = { text: 'wooo!', user: 'jackfrost' };
    commentState = { [postId]: [comment1, comment2] };
    updateCommentsState = commentsReducer(commentState, action);
  });

  it('should remove a comment', () => {
    expect(updateCommentsState[postId]).not.toContain(comment1);
  });

  it('should decrease the length of the array by 1', () => {
    expect(updateCommentsState[postId].length).toEqual(commentState[postId].length - 1);
  });
});