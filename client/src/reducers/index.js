// reducers/index.js
import { combineReducers } from 'redux';
import posts from './post';
import userReducer from './user'; // Corrected import statement

export const reducers = combineReducers({ posts, user: userReducer }); // Corrected userReducer
