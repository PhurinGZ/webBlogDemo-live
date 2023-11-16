import { createContext, useEffect, useState } from "react";
import "./css/App.css";
import axios from "axios";
import CreatePost from "./page/createPost";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Home from "./page/Home";
import Navbar from "./components/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from "./page/post";
import EditPost from "./page/EditPost";

export const userContext = createContext();

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((user) => {
        setUser(user.data);
        console.log(user.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  
  return (
    <userContext.Provider value={user}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/editpost/:id" element={<EditPost />} />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
