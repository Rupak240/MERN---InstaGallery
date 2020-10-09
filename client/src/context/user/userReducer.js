import { USERPROFILE, ERROR, FOLLOWUSER, UNFOLLOWUSER } from "../types";

export default (state, action) => {
  switch (action.type) {
    case USERPROFILE:
      return {
        ...state,
        user: action.payload.user,
        userPosts: action.payload.posts,
      };

    case FOLLOWUSER:
      localStorage.setItem(
        "followers",
        JSON.stringify(action.payload.following)
      );
      localStorage.setItem(
        "following",
        JSON.stringify(action.payload.followers)
      );
      return {
        ...state,
        following: Array.from(new Set([action.payload.following])),
        followers: [action.payload.followers],
      };

    case UNFOLLOWUSER:
      localStorage.setItem(
        "followers",
        JSON.stringify(action.payload.following)
      );
      localStorage.setItem(
        "following",
        JSON.stringify(action.payload.followers)
      );
      return {
        ...state,
        following: Array.from(new Set([action.payload.following])),
        followers: [action.payload.followers],
      };

    case ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
