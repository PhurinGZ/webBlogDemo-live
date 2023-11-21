// api/index.js

import axios from "axios";

const url = "http://localhost:5000/posts";

export const comment = (value, id) =>
  axios.patch(`${url}/${id}/commentPost`, { value });
