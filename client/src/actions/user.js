// actions/user.js
import { FETCH_USER_PROFILE, USER_ERROR } from "../constants/actionType.js";
import * as api from "../api/index.js";

export const profile = (email) => async (dispatch) => {
  try {
    const decodedEmail = decodeURIComponent(email);
    const { data } = await api.profile(decodedEmail);
    dispatch({ type: FETCH_USER_PROFILE, payload: data });
    return data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log("User not found");
    } else {
      console.error("Error fetching user profile:", error);
      dispatch({ type: USER_ERROR, payload: error.message });
      throw error;
    }
  }
};
