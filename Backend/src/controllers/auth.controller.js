import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import TokenBlacklist from "../models/blacklist.model.js";

/**
 * @name regitserUser
 * @description Register a new user, expects username, email and password
 * @access Public
 */
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({
      message: "Please provide username, email and password",
    });

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  }).select("-password");

  if (existingUser) {
    return res.status(400).json({
      message: "Account already exists with this email or username",
    });
  }

  const user = await User.create({
    email,
    username,
    password,
  });

  const token = jwt.sign(
    {
      _id: user._id,
      username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token, {
    HttpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(201).json({
    message: "User registered successfully!!",
    user: {
      _id: user._id,
      username,
      email,
    },
  });
};

/**
 * @name loginUser
 * @description login a user, expects email and password in the request body
 * @access Public
 */

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser)
    return res.status(400).json({
      message: "Invalid email ",
    });

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordValid)
    return res.status(400).json({
      message: "Invalid password",
    });

  const token = jwt.sign(
    {
      _id: existingUser._id,
      username: existingUser.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token, {
    HttpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(201).json({
    message: "User logged in successfully!!",
    user: {
      _id: existingUser._id,
      username: existingUser.username,
      email,
    },
  });
};

/**
 * @name logoutUser
 * @description clears token from user cookie and adds it to the blacklist
 * @access Public
 */

export const logoutUser = async (req, res) => {
  const token = req.cookies.token;

  if (token) {
    await TokenBlacklist.create({ token });
  }

  res.clearCookie("token");

  return res.status(200).json({
    message: "User logged out successfully",
  });
};

export const userProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    message: "User details fetched successfully",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};
