import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { userContext } from "./App";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState();
  const user = useContext(userContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getPostByid/` + id)
      .then((result) => setPost(result.data))
      .catch((err) => console.log(err));
  }, []);

  if (!post) {
    return <div>Loading...</div>;
  }

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/deletepost/` + id)
      .then((result) => (window.location.href = "/"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <img
            src={`http://localhost:5000/Images/${post.file}`}
            alt={post.title}
            className="img-fluid"
          />
          <div className="mt-4">
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>Author: {post.name}</p>
          </div>
          {user.email === post.email ? (
            <>
              <button>
                <Link to={`/editpost/${post._id}`}>Edit</Link>
              </button>
              <button onClick={handleDelete}>Delete</button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
