// api/index.js
import axios from "axios";

const urlPost = "http://localhost:5000/posts";
const urlUser = "http://localhost:5000/users";

// post api
export const comment = (value, id) =>
  axios.patch(`${urlPost}/${id}/commentPost`, { value });

// user api
export const profile = (email) =>
  axios.get(`${urlUser}/profile?email=${email}`);

export const editProfile = (userData, id) =>
  axios.put(`${urlUser}/${id}/editProfile`, { userData });

  // const formData = new FormData();
      // formData.append("name", name);
      // if (selectedFile) {
      //   formData.append("avatar", selectedFile);
      // }