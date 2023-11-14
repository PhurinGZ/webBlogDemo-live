import React, { useContext } from "react";
import "./navbar.css"; // Import your custom CSS file for styling
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "./App";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const user = useContext(userContext);

  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios
      .get("http://localhost:5000/logout")
      .then((res) => {
        console.log(res.data);
        if (res.data === "Success") navigate(0);
      })
      .catch((err) => console.log(err));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#">
          Blog App
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Home
              </Link>
            </li>
            {user.email ? (
              <li className="nav-item">
                <Link className="nav-link" to="/create">
                  Create
                </Link>
              </li>
            ) : (
              <></>
            )}

            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
          </ul>
        </div>
        {user.email ? (
          <div>
            <input
              type="button"
              value="Logout"
              onClick={handleLogout}
              className="btn_input"
            />
          </div>
        ) : (
          <div className="d-flex align-items-center">
            <h5>
              <Link to="/register">Register/Login</Link>
            </h5>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
