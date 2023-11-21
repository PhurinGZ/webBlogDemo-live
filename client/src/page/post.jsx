import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { userContext } from "../App";
import CommentSection from "../components/postComment";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const user = useContext(userContext);
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getPostByid/${id}`)
      .then((result) => setPost(result.data))
      .catch((err) => console.log(err));
  }, []);

  if (!post) {
    return <div>Loading...</div>;
  }


  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/deletepost/${id}`)
      .then(() => navigate("/")) // Navigate back to the home page after deletion
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg mb-4">
            <img
              src={`http://localhost:5000/Images/${post.file}`}
              alt={post.title}
              className="card-img-top rounded-top"
              style={{ width: "100%" }}
            />
            <div className="card-body">
              <h2 className="card-title text-center">{post.title}</h2>
              <p className="card-text text-justify">{post.description}</p>
              <p className="card-text text-center">
                Author: <span className="font-weight-bold">{post.name}</span>
              </p>
            </div>

            {user.email === post.email && (
              <div className="card-footer d-flex justify-content-center">
                <button className="btn btn-outline-secondary me-2">
                  <Link
                    to={`/editpost/${post._id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Edit
                  </Link>
                </button>

                <button
                  onClick={handleDelete}
                  className="btn btn-outline-danger"
                  style={{ color: "black" }}
                >
                  Delete
                </button>
              </div>
            )}
            {/* Back button */}
            <button
              onClick={() => navigate("/")}
              className="btn btn-outline-primary"
              style={{ color: "black" }}
            >
              Back
            </button>
            <hr />

            <CommentSection post={post} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
