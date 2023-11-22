import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { userContext } from "../App";
import CommentSection from "../components/postComment";
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Button,
  Typography,
  Avatar,
  Grid,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const user = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getPostByid/${id}`)
      .then((result) => setPost(result.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/deletepost/${id}`)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <Grid container justifyContent="center" className="mt-5">
      <Grid item xs={12} md={8}>
        <Card style={{ padding: "30px" }}>
          <CardHeader
            title={post.title}
            subheader={`Author: ${post.name}`}
            avatar={
              <Avatar src={`http://localhost:5000/Images/${post.file}`} />
            }
          />
          {post.file ? (
            <img
              src={`http://localhost:5000/Images/${post.file}`}
              alt={post.title}
              className="card-img-top rounded-top"
              style={{ width: "100%" }}
            />
          ) : (
            <></>
          )}

          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.description}
            </Typography>
          </CardContent>

          {user.email === post.email && (
            <CardActions>
              <IconButton
                component={Link}
                to={`/editpost/${post._id}`}
                color="primary"
              >
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDelete} color="error">
                <DeleteIcon />
              </IconButton>
            </CardActions>
          )}

          <CardActions>
            <Button
              onClick={() => navigate("/")}
              variant="outlined"
              color="primary"
            >
              Back
            </Button>
          </CardActions>
          <hr />

          <CommentSection post={post} />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Post;
