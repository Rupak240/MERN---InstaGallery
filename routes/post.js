const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const auth = require("../middleware/auth");

router.get("/posts", auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "_id name email")
      .populate("likes", "_id name")
      .populate("comments.postedBy", "_id name");
    return res.status(200).json({ msg: "Post fetched successfully", posts });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Error in fetching post" });
  }
});

router.post("/createpost", auth, async (req, res) => {
  const { title, body, url } = req.body;
  if (!title || !body || !url) {
    return res.status(400).json({ msg: "Please add all the fields" });
  }

  //   console.log(req.user);
  req.user.password = undefined;

  try {
    const newPost = new Post({ title, body, photo: url, postedBy: req.user });
    const post = await newPost.save();

    return res.status(200).json({ msg: "Post created successfully", post });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Post is not saved" });
  }
});

router.get("/ownpost", auth, async (req, res) => {
  try {
    // console.log(req.user);
    const post = await Post.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "_id name email"
    );

    return res.json({ post });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
});

router.put("/like", auth, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.id,
    { $push: { likes: req.user._id } },
    { new: true }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((error, response) => {
      if (error) {
        return res.status(400).json({ msg: error });
      } else {
        // console.log(response);
        return res.json({ response });
      }
    });
});

router.put("/unlike", auth, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((error, response) => {
      if (error) {
        return res.status(400).json({ msg: error });
      } else {
        return res.json({ response });
      }
    });
});

router.put("/comment", auth, (req, res) => {
  const comment = { text: req.body.text, postedBy: req.user._id };

  Post.findByIdAndUpdate(
    req.body.id,
    { $push: { comments: comment } },
    { new: true }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((error, response) => {
      if (error) {
        return res.status(400).json({ msg: error });
      } else {
        return res.json({ response });
      }
    });
});

router.delete("/delete/:id", auth, (req, res) => {
  Post.findOne({ _id: req.params.id })
    .populate("postedBy", "_id")
    .exec((error, post) => {
      if (error || !post) {
        return res.status(400).json({ error });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            return res.json({ msg: "Successfully deleted", result });
          })
          .catch((error) => {
            console.log(err);
            return res.json({ error });
          });
      }
    });
});

module.exports = router;
