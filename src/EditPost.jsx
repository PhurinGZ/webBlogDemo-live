import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditPost() {
  const [title, setTitle] = useState();
  const [description, setDesc] = useState();
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:5000/editpost/"+id, {title, description})
      .then((res) => {
        if (res.data) {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/getPostByid/` + id)
      .then((result) => {
        setTitle(result.data.title), setDesc(result.data.description);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mt-5">
            <div className="card-header">
              <h3 className="text-center">Update Post</h3>
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    value={description}
                    onChange={(e) => setDesc(e.target.value)}
                  ></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Udate
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

export default EditPost;
