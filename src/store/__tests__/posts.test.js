/* eslint-env jest */
import { posts as postsReducer } from '../reducers/posts';
import posts from '../../data/posts';
import { INCREMENT_LIKES } from '../actionTypes';

describe('Post Reducer', () => {
  it('should add a like to an existing post', () => {
    const index = 2;
    const action = { type: INCREMENT_LIKES, index };
    const actual = postsReducer(posts, action);
    expect(actual[index].likes).toEqual(posts[index].likes + 1);
  });
});
