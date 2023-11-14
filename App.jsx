import { createContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import CreatePost from './createPost'
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Home from "./Home"
import Navbar from "./navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from './post'
import EditPost from './EditPost'

export const userContext = createContext();

function App() {

  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/') 
      .then(user => {
        setUser(user.data)
        console.log(user.data)
      })
      .catch(err => {
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
  )
}

export default App
