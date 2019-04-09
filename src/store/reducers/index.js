import { combineReducers } from 'redux';

import { comments } from './comments';
import { posts } from './posts';
import { registerUser } from './registerUser';

const rootReducer = combineReducers({
  comments,
  posts,
  registerUser,
});

export default rootReducer;
