// auth/userAuth.js
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

export const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Token not available" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized - Token is wrong" });
      } else {
        req.email = decoded.email;
        req.name = decoded.name;
      }
      next();
    });
  }
};

export default router;
