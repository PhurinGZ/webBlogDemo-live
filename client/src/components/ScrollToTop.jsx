// ScrollToTop.jsx
import icon from "../assets/back-to-top.png";

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button className="btn-scroll-top" onClick={scrollToTop}>
      <img src={icon} alt="" style={{ width: "5rem", height: "5rem" }} />
    </button>
  );
};

export default ScrollToTop;
