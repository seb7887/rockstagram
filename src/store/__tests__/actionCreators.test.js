/* eslint-env jest */
import {
  incrementLikes,
  removeComment,
  addComment,
} from '../actions/actionCreators';
import { INCREMENT_LIKES, REMOVE_COMMENT, ADD_COMMENT } from '../actionTypes';

describe('Action Creators', () => {
  describe('incrementLikes', () => {
    it('should create an action to increment likes', () => {
      const expected = {
        type: INCREMENT_LIKES,
        index: 7,
      };

      const actual = incrementLikes(7);
      expect(actual).toEqual(expected);
    });
  });

  describe('addComment', () => {
    it('should create an action to add a comment', () => {
      const postId = 'test';
      const author = 'kingmob';
      const comment = 'This is a test';

      const expected = {
        type: ADD_COMMENT,
        postId,
        author,
        comment,
      };

      const actual = addComment(postId, author, comment);
      expect(actual).toEqual(expected);
    });
  });

  describe('removeComment', () => {
    it('should create an action to remove a comment', () => {
      const expected = {
        type: REMOVE_COMMENT,
        postId: 'test',
        i: 3,
      };

      const actual = removeComment('test', 3);
      expect(actual).toEqual(expected);
    });
  });
});
