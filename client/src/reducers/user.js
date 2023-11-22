// reducers/user.js
import { FETCH_USER_PROFILE, USER_ERROR } from '../constants/userActionTypes';

const initialState = {
  userProfile: null,
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
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    // Add more cases for other user-related actions if needed
    default:
      return state;
  }
};

export default userReducer;
