// ScrollToTopButton.js
import React, { useState, useEffect } from "react";
import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  scrollButton: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    opacity: 0,
    transition: "opacity 0.3s ease",
    pointerEvents: "none", // Ignore pointer events when not visible
  },
  scrollButtonVisible: {
    opacity: 1,
    pointerEvents: "auto",
  },
}));

const ScrollToTopButton = () => {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;

    // Show the button when the user has scrolled down more than 200 pixels
    setIsVisible(scrollTop > 200);
  };

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Attach the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Detach the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <Fab
      color="primary"
      className={`${classes.scrollButton} ${isVisible && classes.scrollButtonVisible}`}
      onClick={handleScrollTop}
    >
      <KeyboardArrowUpIcon />
    </Fab>
  );
};

export default ScrollToTopButton;
