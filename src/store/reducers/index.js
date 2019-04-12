import { combineReducers } from 'redux';

import { comments } from './comments';
import { posts } from './posts';
import { registerUser } from './registerUser';
import { loginUser } from './loginUser';
import { authUser } from './authUser';

const rootReducer = combineReducers({
  comments,
  posts,
  registerUser,
  loginUser,
  authUser,
});

export default rootReducer;
