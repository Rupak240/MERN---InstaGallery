const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const User = require("../models/User");

router.get("/user/:id", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    return res.status(400).json({ msg: "User not found!" });
  }

  try {
    const posts = await Post.find({ postedBy: req.params.id }).populate(
      "postedBy",
      "_id name"
    );

    return res.json({ user, posts });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
});

router.put("/follow", auth, (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    { new: true },
    (error, result) => {
      if (error) {
        return res.status(400).json({ msg: error });
      }
      User.findByIdAndUpdate(
        req.user._id,
        { $push: { following: req.body.followId } },
        { new: true }
      )
        .select("-password")
        .then((result) => {
          return res.json(result);
        })
        .catch((error) => {
          console.log(error);
          return res.status(400).json({ msg: error });
        });
    }
  );
});

router.put("/unfollow", auth, (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    { new: true },
    (error, result) => {
      if (error) {
        return res.status(400).json({ msg: error });
      }
      User.findByIdAndUpdate(
        req.user._id,
        { $pull: { following: req.body.followId } },
        { new: true }
      )
        .select("-password")
        .then((result) => {
          return res.json({ result });
        })
        .catch((error) => {
          console.log(error);
          return res.status(400).json({ msg: error });
        });
    }
  );
});

module.exports = router;

// router.get("/user/:id", auth, (req, res) => {
//     User.findOne({ _id: req.params.id })
//       .select("-password")
//       .then((user) => {
//         Post.find({ postedBy: req.params.id })
//           .populate("postedBy", "_id name")
//           .exec((error, posts) => {
//             if (error) {
//               return res.status(400).json({ msg: error });
//             }
//             return res.json({ user, posts });
//           });
//       })
//       .catch((error) => {
//         return res.status(404).json({ msg: "User not found!" });
//       });
//   });
