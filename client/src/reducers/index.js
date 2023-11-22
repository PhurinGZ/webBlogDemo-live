// reducers/index.js
import { combineReducers } from 'redux';

import posts from './post';

export const reducers = combineReducers({ posts });