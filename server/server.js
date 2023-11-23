// server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import fs from "fs";

import postRoutes from "./routes/post.js";
import User from "./model/userModel.js";
import postModel from "./model/postModel.js";
// import verifyUser from "./auth/userAuth.js"

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:10000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Add PATCH to the allowed methods
    credentials: true, // Allow credentials (cookies)
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("Public"));
dotenv.config();
const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost:27017/my-database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected!!"))
  .catch((error) => console.error("MongoDB connection error:", error));

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("The token was not available");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json("Token is wrong");
      } else {
        req.email = decoded.email;
        req.name = decoded.name;
      }
      next();
    });
  }
};

app.get("/", verifyUser, async (req, res) => {
  return res.json({ email: req.email, name: req.name });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      const token = jwt.sign(
        { email: user.email, name: user.name },
        "jwt-secret-key",
        {
          expiresIn: "1d",
        }
      );
      res.cookie("token", token);
      res.json({ success: true, user });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/register", async (req, res) => {
  const formData = req.body;

  if (!formData.name || !formData.email || !formData.password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email: formData.email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // If the email doesn't exist, create a new user
    const user = new User({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    await user.save();
    return res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed" });
  }
});

const storages = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storages,
});

app.post("/create", verifyUser, upload.single("file"), (req, res) => {
  postModel
    .create({
      title: req.body.title,
      description: req.body.description,
      file: req.file ? req.file.filename : null,
      email: req.body.email,
      name: req.body.name,
    })
    .then((result) => res.json(result))
    .catch((err) => {
      console.error("Error creating post:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.get("/getPosts", (req, res) => {
  postModel
    .find()
    .then((posts) => res.json(posts))
    .catch((err) => res.json(err));
});

app.get("/getPostByid/:id", (req, res) => {
  const id = req.params.id;
  postModel
    .findById({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => console.log(err));
});

app.put("/editpost/:id", (req, res) => {
  const id = req.params.id;
  postModel
    .findByIdAndUpdate(
      { _id: id },
      {
        title: req.body.title,
        description: req.body.description,
      }
    )
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.delete("/deletepost/:id", async (req, res) => {
  try {
    // Find the post by ID
    const post = await postModel.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Delete the post from the database
    await postModel.findByIdAndDelete(req.params.id);

    // Get the filename from the post
    const filename = post.file;

    // Delete the associated file
    const filePath = path.join("Public/Images", filename);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        res
          .status(500)
          .json({ message: "Error deleting file", error: err.message });
      } else {
        console.log("File deleted successfully");
      }
    });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ message: "Server error" });
  }
  res.json({ message: "Success" });
});

app.use("/posts", postRoutes);

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json("Success");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
