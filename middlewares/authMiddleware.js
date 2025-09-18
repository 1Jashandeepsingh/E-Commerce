import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Routes (Token based)
export const requireSignIn = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Authorization token missing",
      });
    }

    // Handle "Bearer <token>" format
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).send({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Admin Access Middleware
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== 1) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized Access: Admins only",
      });
    }

    next();
  } catch (error) {
    console.error("Admin Middleware Error:", error.message);
    return res.status(500).send({
      success: false,
      message: "Error in admin middleware",
      error: error.message,
    });
  }
};
