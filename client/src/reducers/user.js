// reducers/user.js
import { FETCH_USER_PROFILE, USER_ERROR, UPDATE_USER_PROFILE } from '../constants/actionType.js';

const initialState = {
  userProfile: {},
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
        error: null,
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
        error: null,
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
