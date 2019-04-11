import { combineReducers } from 'redux';

import { comments } from './comments';
import { posts } from './posts';
import { registerUser } from './registerUser';
import { loginUser } from './loginUser';

const rootReducer = combineReducers({
  comments,
  posts,
  registerUser,
  loginUser,
});

export default rootReducer;
