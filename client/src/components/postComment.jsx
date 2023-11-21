import  { useState, useRef , useContext} from "react";
import { Typography, TextField, Button } from "@mui/material";
import useStyles  from "./style";
import { useDispatch } from "react-redux";
import { commentPost } from "../actions/post";
import {userContext} from '../App'



const CommentSection = ({ post }) => {
  const user = useContext(userContext);

  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments || []); 
  const [comment, setComment] = useState('');
  const users = JSON.parse(localStorage.getItem('user')) || {}; 
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

      setComments(newComments);
      setComment('');

      commentRef.current.scrollIntoView({ behavior: 'smooth'})
    } catch (error) {
      console.error("Error while commenting:", error);
    }
  };

  return (
    <div>
      <div className={classes.commentOuterContainer}>
        <div className={classes.commentInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comment
          </Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentRef}/>
        </div>
        {user?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a Comment
            </Typography>
            <TextField 
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button style={{marginTop: '10px'}} fullWidth disabled={!comment} color="primary" variant="contained" onClick={handleClick}>
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;


