const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  // likes: [
  //   {
  //     id: mongoose.Schema.Types.ObjectId,
  //     postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  //   },
  // ],
  comments: [
    {
      text: String,
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", PostSchema);
