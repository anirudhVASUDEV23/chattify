import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const socketAuthMiddleWare = async (socket, next) => {
  try {
    //extract the token from our http only cookie
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized no token provided"));
    }

    //verify the token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      console.log("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized invalid token"));
    }

    //find the user by id
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("Unauthorized user not found"));
    }
    //attach user info to socket object
    socket.user = user;
    socket.userId = user._id.toString();
    console.log(`Socket connection accepted: ${user.fullName} ${user._id}`);
    next();
  } catch (error) {
    console.error("Socket authentication error:", error);
    next(new Error("Unauthorized socket authentication error"));
  }
};
