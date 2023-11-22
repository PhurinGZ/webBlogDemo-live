// actions/user.js
import { FETCH_USER_PROFILE, USER_ERROR } from '../constants/actionType.js';
import * as api from '../api/index.js';

export const profile = (email) => async (dispatch) => {
  try {
    const { data } = await api.profile(email);
    dispatch({ type: FETCH_USER_PROFILE, payload: data });
    return data.profile;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Handle 404 error (user not found)
      console.log("User not found");
    } else {
      console.error("Error fetching user profile:", error);
      dispatch({ type: USER_ERROR, payload: error.message });
      throw error;
    }
  }
};
