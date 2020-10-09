const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ error: "You must be logged in " });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // console.log(decoded);

    const { _id } = decoded;
    const userData = await User.findById(_id);

    req.user = userData;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token" });
  }
};
