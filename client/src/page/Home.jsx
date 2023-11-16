// Home.jsx
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/home.css";
import ScrollToTop from "../components/ScrollToTop";
import PostCard from "../components/PostCard";
import {useEffect,useState} from "react"

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getPosts");
        setPosts(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData(); // Initial data fetch

    const handleScroll = () => {
      const scrollButton = document.querySelector(".btn-scroll-top");
      if (scrollButton) {
        // Update the display property based on the scroll position
        scrollButton.style.display = window.scrollY > 200 ? "block" : "none";
      }

      // Save the scroll position to sessionStorage
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    };

    // Attach event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  useEffect(() => {
    // Retrieve the scroll position from sessionStorage
    const scrollPosition = sessionStorage.getItem("scrollPosition");

    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
    }
  }, []);

  return (
    <div className="container">
      <h1>Blog Posts</h1>
      <div className="row justify-content-center">
        <div className="col-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Home;
