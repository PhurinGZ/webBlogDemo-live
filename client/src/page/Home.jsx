// Home.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import ScrollToTopButton from "../components/ScrollToTop";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getPosts");
        setPosts(response.data.reverse());
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");

    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
    }
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid
              item
              key={post._id}
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <ScrollToTopButton />
    </React.Fragment>
  );
};

export default Home;
