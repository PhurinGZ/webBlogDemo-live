// reducers/post.js
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionType';

const postReducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      // Assuming action.payload contains the array of posts
      return action.payload.posts; // Make sure the property name aligns with your API response
    case LIKE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case COMMENT:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};

export default postReducer;
