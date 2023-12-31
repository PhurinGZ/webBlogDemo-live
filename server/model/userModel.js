import mongoose from "mongoose";


// Create a schema for the user model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Create a user model
const User = mongoose.model("User", userSchema);

export default User;
