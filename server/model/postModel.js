const mongoose = require("mongoose");


// Create a schema for the user model
const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  file: String,
  email: String,
  name: String,
});

// Create a user model
const Post = mongoose.model("Posts", postSchema);

module.exports = Post;
