import { combineReducers } from 'redux';

import { comments } from './comments';
import { posts } from './posts';
import { registerUser } from './registerUser';
import { currentUser } from './currentUser';

const rootReducer = combineReducers({
  comments,
  posts,
  registerUser,
  currentUser,
});

export default rootReducer;
