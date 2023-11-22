// PostCard.jsx
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import defaultImage from "../assets/Default.png"

const useStyles = makeStyles((theme) => ({
  grid:{
    marginTop:"40px"
  },
  card: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    maxWidth: 400,
    margin: "auto",
    // boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
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

  return (
    <Grid item xs={12} sm={6} md={4} className={classes.grid}>
      <Link to={`/post/${post._id}`} style={{ textDecoration: "none" }}>
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
                  <Avatar
                    src={defaultImage}
                    className={classes.avatar}
                  />
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
            <Typography variant="h6" className="card-title-home">
              {post.title}
            </Typography>
            <Typography variant="body2" className="card-text-home text">
              {post.description.length <= 100
                ? post.description
                : post.description.substr(0, 100) + "..."}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default PostCard;
