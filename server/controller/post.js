import express from "express";
import mongoose from "mongoose";
import postModel from "../model/postModel.js";

const router = express.Router();

// controller/post.js
export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  const post = await postModel.findById(id);
  post.comments.push(value);

  const updatedPost = await postModel.findByIdAndUpdate(id, { comments: post.comments }, { new: true });

  res.json(updatedPost);
};

export const test = async (req, res) => {
  console.log("this is test")
}


export default router;