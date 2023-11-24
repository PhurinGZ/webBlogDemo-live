// controller/user.js
import express from "express";
import User from "../model/userModel.js";

const router = express.Router();

export const userProfile = async (req, res) => {
  try {
    const userEmail = req.query.email;

    const userData = await User.findOne({ email: userEmail });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ profile: userData });
  } catch (error) {
    console.error("Error fetching user profile data:", error);
    res.status(500).json({
      message: "Error fetching user profile data",
      error: error.message,
    });
  }
};

export const editUserProfile = async (req, res) => {
  try {
    const { userData } = req.body;
    const { id } = req.params;

    // Check if a file is included in the request
    let avatarFile = null;
    if (req.file) {
      avatarFile = req.file.filename;
    }

    console.log(userData)

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name: userData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (updatedUser) {
      console.log("success")
    }

    res.json({ profile: updatedUser });
  } catch (error) {
    console.error("Error updating user profile data:", error);
    res.status(500).json({
      message: "Error updating user profile data",
      error: error.message,
    });
  }
};

export default router;
