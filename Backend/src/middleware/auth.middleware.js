import jwt from "jsonwebtoken";
import TokenBlacklist from "../models/blacklist.model.js";

async function authUser(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Token not available",
      });
    }

    const isTokenBlacklisted = await TokenBlacklist.findOne({ token });

    if (isTokenBlacklisted)
      return res.status(401).json({
        message: "Token is invalid",
      });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
}

export default authUser;
