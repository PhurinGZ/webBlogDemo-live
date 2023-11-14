import React, { useContext, useState } from "react";
import axios from "axios";
import { userContext } from './App'

function CreatePost() {
  const [title, setTitle] = useState();
  const [description, setDesc] = useState();
  const [file, setFile] = useState();
  const user = useContext(userContext);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("email", user.email)
    formData.append("name", user.name)
    formData.append("file", file);
  
    axios
      .post("http://localhost:5000/create", formData)
      .then((res) => {
        if (res.data) {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mt-5">
            <div className="card-header">
              <h3 className="text-center">Create a New Post</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="postTitle" className="form-label">
                    Post Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="postTitle"
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="postDescription" className="form-label">
                    Post Description
                  </label>
                  <textarea
                    className="form-control"
                    id="desc"
                    rows="10"
                    cols="30"
                    name="desc"
                    onChange={e => setDesc(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="postImage" className="form-label">
                    Upload an Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="file"
                    id="postImage"
                    onChange={e => setFile(e.target.files[0])}
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
