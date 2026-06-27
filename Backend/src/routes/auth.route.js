import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import authUser from "../middleware/auth.middleware.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

authRouter.post("/register", authController.registerUser);

/**
 * @route POST /api/auth/login
 * @description Login user with email and password
 * @access Public
 */

authRouter.post("/login", authController.loginUser);

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access Public
 */

authRouter.get("/logout", authController.logoutUser);

/**
 * @route GET /api/auth/profile
 * @description get the current logged in user details
 * @access Private
 */

authRouter.get("/profile", authUser, authController.userProfile);

export default authRouter;
