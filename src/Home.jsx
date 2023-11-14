import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Number of posts to display per page

  useEffect(() => {
    axios
      .get("http://localhost:5000/getPosts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <h1>Blog Posts</h1>
      <div className="row">
        {currentPosts.map((post) => (
          <Link
            to={`/post/${post._id}`}
            key={post._id}
            className="col-md-4 col-sm-6"
          >
            <div className="card card-home">
              <img
                src={`http://localhost:5000/Images/${post.file}`}
                alt={post.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h2 className="card-title card-title-home">{post.title}</h2>
                <p className="card-text card-text-home">{post.description}</p>
                <p className="card-text card-text-home">{post.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <ul className="pagination">
        {Array(Math.ceil(posts.length / postsPerPage))
          .fill()
          .map((_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
            >
              <button
                onClick={() => paginate(index + 1)}
                className="page-link"
              >
                {index + 1}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Home;
