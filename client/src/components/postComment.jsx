import React, { useState, useRef, useContext } from "react";
import { Typography, TextField, Button, Paper } from "@mui/material";
import useStyles from "./style";
import { useDispatch } from "react-redux";
import { commentPost } from "../actions/post";
import { userContext } from "../App";

const CommentSection = ({ post }) => {
  const user = useContext(userContext);

  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments || []);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const commentRef = useRef();

  const handleClick = async () => {
    try {
      if (!user) {
        console.error("User not found");
        return;
      }

      const finalComment = `${user.name}: ${comment}`;
      const newComments = await dispatch(commentPost(finalComment, post._id));
      // console.log("newComments:", newComments);

      setComments(newComments);
      setComment("");

      commentRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error while commenting:", error);
    }
  };

  return (
    <Paper elevation={3} className={classes.commentOuterContainer}>
      <Typography gutterBottom variant="h6" align="center">
        Comments
      </Typography>
      <div className={classes.commentInnerContainer}>
        {comments?.map((c, i) => (
          <Paper key={i} elevation={1} className={classes.commentPaper}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>{c.split(": ")[0]}</strong>
              {c.split(":")[1]}
            </Typography>
          </Paper>
        ))}
        <div ref={commentRef} />
      </div>
      {user?.name && (
        <div className={classes.commentFormContainer}>
          <Typography variant="h6" gutterBottom>
            Write a Comment
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Your Comment"
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            margin="normal"
          />
          <Button
            style={{ marginTop: "10px" }}
            fullWidth
            disabled={!comment}
            color="primary"
            variant="contained"
            onClick={handleClick}
          >
            Comment
          </Button>
        </div>
      )}
    </Paper>
  );
};

export default CommentSection;
