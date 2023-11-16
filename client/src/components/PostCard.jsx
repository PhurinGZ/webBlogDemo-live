// PostCard.jsx
import { Link } from "react-router-dom";

const PostCard = ({ post }) => (
  <Link
    to={`/post/${post._id}`}
    className="col-md-4 col-sm-6"
    style={{ textDecoration: "none" }}
  >
    <div className="card card-home m-3">
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
);

export default PostCard;
