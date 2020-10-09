import React, { useReducer } from "react";
import axios from "axios";
import M from "materialize-css";
import PostContext from "./postContext";
import postReducer from "./postReducer";
import {
  IMAGEUPLOAD,
  ERROR,
  CREATEPOST,
  FETCHPOSTS,
  PROFILEPOST,
  LIKEPOST, 
  UNLIKEPOST,
  DOCOMMENT,
  DELETEPOST,
} from "../types";

const PostState = (props) => {
  let initialState = {
    posts: [],
    updatedPosts: [],
    profilePosts: [],
    imageUrl: "",
    postCreated: false,
    error: "",
  };

  const [state, dispatch] = useReducer(postReducer, initialState);

  const imageUpload = async (data) => {
    // const config = { headers: { "Content-Type": "application/json" } };

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/instagallery/image/upload",
        data
        // config
      );

      console.log(res.data);
      dispatch({ type: IMAGEUPLOAD, payload: res.data });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: ERROR, payload: error.message });

      M.toast({
        html: "Image is required to create a post",
        classes: "#c62828 red darken-3",
      });
    }
  };

  const createPost = async (postData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    try {
      const res = await axios.post("/createpost", postData, config);

      console.log(res.data);
      dispatch({ type: CREATEPOST, payload: res.data });

      M.toast({ html: res.data.msg, classes: "#43a047 green darken-1" });
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({ type: ERROR, payload: error });

      M.toast({
        html: error.response.data.msg,
        classes: "#c62828 red darken-3",
      });
    }
  };

  const fetchPosts = async () => {
    const config = {
      headers: { "x-auth-token": localStorage.getItem("token") },
    };

    try {
      const res = await axios.get("/posts", config);

      // console.log(res);
      dispatch({ type: FETCHPOSTS, payload: res.data });

      // M.toast({ html: res.data.msg, classes: "#43a047 green darken-1" });
    } catch (error) {
      console.log(error);
      dispatch({ type: ERROR, payload: error });

      // M.toast({
      //   html: error.response.data.msg,
      //   classes: "#c62828 red darken-3",
      // });
    }
  };

  const fetchProfilePosts = async () => {
    const config = {
      headers: { "x-auth-token": localStorage.getItem("token") },
    };

    try {
      const res = await axios.get("/ownpost", config);

      console.log(res.data.post);
      dispatch({ type: PROFILEPOST, payload: res.data.post });
    } catch (error) {
      console.log(error);
      dispatch({ type: ERROR, payload: error });
    }
  };

  const likePost = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    // console.log(id);

    try {
      const res = await axios.put("/like", JSON.stringify({ id }), config);

      console.log(res.data.response);
      dispatch({ type: LIKEPOST, payload: res.data.response });
    } catch (error) {
      console.log(error);
      dispatch({ type: ERROR, payload: error });
    }
  };

  const unlikePost = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    try {
      const res = await axios.put("/unlike", JSON.stringify({ id }), config);

      console.log(res.data.response);
      dispatch({ type: UNLIKEPOST, payload: res.data.response });
    } catch (error) {
      console.log(error);
      dispatch({ type: ERROR, payload: error });
    }
  };

  const doComment = async (text, id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    try {
      const res = await axios.put(
        "/comment",
        JSON.stringify({ text, id }),
        config
      );

      console.log(res.data.response);
      dispatch({ type: DOCOMMENT, payload: res.data.response });
    } catch (error) {
      console.log(error);
      dispatch({ type: ERROR, payload: error });
    }
  };

  const deletePost = async (id) => {
    const config = {
      headers: {
        // "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    try {
      const res = await axios.delete(`/delete/${id}`, config);

      console.log(res.data.msg)
      console.log(res.data.result._id)
      dispatch({ type: DELETEPOST, payload: res.data.result });

      M.toast({ html: res.data.msg, classes: "#43a047 green darken-1" });

    } catch (error) {
      console.log(error);
      dispatch({ type: ERROR, payload: error });
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        updatedPosts: state.updatedPosts,
        profilePosts: state.profilePosts,
        imageUrl: state.imageUrl,
        postCreated: state.postCreated,
        error: state.error,
        imageUpload,
        createPost,
        fetchPosts,
        fetchProfilePosts,
        likePost,
        unlikePost,
        doComment,
        deletePost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
