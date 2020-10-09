import React, { useReducer } from "react";
import axios from "axios";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import { USERPROFILE, ERROR, FOLLOWUSER, UNFOLLOWUSER } from "../types";

const UserState = (props) => {
  const initialState = {
    user: [],
    userPosts: [],
    followers: [],
    following: [],
    error: "",
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  const fetchUserProfile = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    try {
      const res = await axios.get(`/user/${id}`, config);

    //   console.log(res.data);
      dispatch({ type: USERPROFILE, payload: res.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: ERROR, payload: error });
    }
  };

  const followUser = async (followId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    try {
      const res = await axios.put(
        "/follow",
        JSON.stringify({ followId }),
        config
      );

      console.log(res.data);
      dispatch({ type: FOLLOWUSER, payload: res.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: ERROR, payload: error });
    }
  };

  const unfollowUser = async (unfollowId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    try {
      const res = await axios.put(
        "/unfollow",
        JSON.stringify({ unfollowId }),
        config
      );

      console.log(res.data);
      dispatch({ type: UNFOLLOWUSER, payload: res.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: ERROR, payload: error });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        userPosts: state.userPosts,
        followers: state.followers,
        following: state.following,
        error: state.error,
        fetchUserProfile,
        followUser, unfollowUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
