import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionType';

export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case LIKE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case COMMENT:
      return {
        ...state, // Fix the typo here
        posts: posts.map((post) => {
          if (post._id === action.payload._id) return action.payload;
          return post;
        }),
      };
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
