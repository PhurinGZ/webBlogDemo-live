// PostCard.js
import React, { useState, useContext } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  CardActions,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import defaultImage from "../assets/Default.png";
import CommentSection from "../components/postComment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../App";

import "../css/PostCard.css"; // Import the CSS file

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: "40px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    maxWidth: 400,
    margin: "auto",
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    width: "100%",
  },
}));

const PostCard = ({ post }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = useContext(userContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/deletepost/${post._id}`)
      .then(() => {
        handleClose();
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Grid item xs={12} sm={6} md={4} className={classes.grid}>
      <div onClick={handleOpen} style={{ cursor: "pointer" }}>
        <Card className={classes.card}>
          <CardContent>
            <Grid container alignItems="center">
              <Grid item>
                {post.authorAvatar ? (
                  <Avatar
                    src={`http://localhost:5000/Images/${post.authorAvatar}`}
                    className={classes.avatar}
                  />
                ) : (
                  <Avatar src={defaultImage} className={classes.avatar} />
                )}
              </Grid>
              <Grid item style={{ marginLeft: "10px" }}>
                {post.name ? (
                  <Typography variant="subtitle1">
                    <strong>{post.name}</strong>
                  </Typography>
                ) : (
                  <Typography variant="subtitle1">
                    <strong>Unknown</strong>
                  </Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
          {post.file ? (
            <CardMedia
              className={classes.media}
              image={`http://localhost:5000/Images/${post.file}`}
              alt={post.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "default-image-url.jpg";
              }}
            />
          ) : (
            <></>
          )}
          <CardContent>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body2">
              {post.description.length <= 100
                ? post.description
                : post.description.substr(0, 100) + "..."}
            </Typography>
          </CardContent>
        </Card>
      </div>

      <Dialog open={open} onClose={handleClose} scroll="paper">
        <DialogContent dividers>
          <Typography variant="h6">{post.title}</Typography>
          <Typography variant="subtitle1">Author: {post.name}</Typography>
          {post.file && (
            <img
              src={`http://localhost:5000/Images/${post.file}`}
              alt={post.title}
              className="card-img-top rounded-top"
              style={{ width: "100%" }}
            />
          )}
          <Typography variant="body2">{post.description}</Typography>

          {user.email === post.email && (
            <div>
              <hr />

              <CardActions style={{ padding: 0 }}>
                <Button
                  component={Link}
                  to={`/editpost/${post._id}`}
                  color="primary"
                >
                  <EditIcon />
                </Button>
                <Button onClick={handleDelete} color="error">
                  <DeleteIcon />
                </Button>
              </CardActions>
            </div>
          )}

          <hr />

          <CommentSection post={post} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default PostCard;
