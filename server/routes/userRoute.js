import express from "express";
import {
  checkAuthUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/UserController.js";
import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/is-auth", authUser, checkAuthUser);
userRouter.get("/logout", authUser, logoutUser);

export default userRouter;
