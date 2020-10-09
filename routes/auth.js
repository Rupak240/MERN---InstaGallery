const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const jwtSecret = config.get("jwtSecret");
const auth = require('../middleware/auth')


router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ msg: "Please fill out all the fields" });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ msg: `User with ${email} already exists` });
    }

    user = new User({ name, email, password });

    //  Hashing the password with bcryptJS
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    return res.status(200).json({ msg: "Saved successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Did not save user" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please add an email and a password" });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password entered" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ msg: "Invalid email or password entered" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      jwtSecret,
      { expiresIn: 360000 }
    );

    return res.status(200).json({ token, msg: "Successfully signed in", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Did not sign in" });
  }
});

module.exports = router;
