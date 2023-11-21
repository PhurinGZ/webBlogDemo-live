// action/post.js

import { FETCH_ALL, CREATE, UPDATE, DELETE, COMMENT } from "../constants/actionType";
import * as api from "/src/api/index.js";

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id);
        dispatch({ type: COMMENT, payload: data });
        return data.comments;
    } catch (error) {
        console.log(error);
    }
};
