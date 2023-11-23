// actions/user.js
import { FETCH_USER_PROFILE, USER_ERROR, UPDATE_USER_PROFILE } from "../constants/actionType.js";
import * as api from "../api/index.js";

export const profile = (email) => async (dispatch) => {
  try {
    const decodedEmail = decodeURIComponent(email);
    const { data } = await api.profile(decodedEmail);
    dispatch({ type: FETCH_USER_PROFILE, payload: data.profile });
    return data.profile;
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

export const updateProfile = (userData) => async (dispatch) => {
  try {
    const { data } = await api.editProfile(userData);
    dispatch({ type: UPDATE_USER_PROFILE, payload: data.profile });
    return data.profile;
  } catch (error) {
    console.error("Error updating user profile:", error);
    dispatch({ type: USER_ERROR, payload: error.message });
    throw error;
  }
};
