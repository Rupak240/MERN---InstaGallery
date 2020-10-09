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

export default (state, action) => {
  switch (action.type) {
    case IMAGEUPLOAD:
      return { ...state, imageUrl: action.payload.url };

    case CREATEPOST:
      return { ...state, postCreated: true };

    case FETCHPOSTS:
      return {
        ...state,
        posts: action.payload.posts.reverse(),
        updatedPosts: action.payload.posts.reverse(),
      };

    case PROFILEPOST:
      return { ...state, profilePosts: action.payload };

    case LIKEPOST:
      console.log(action.payload);
      console.log(state.posts);
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          } else {
            return post;
          }
        }),
      };

    case UNLIKEPOST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          } else {
            return post;
          }
        }),
      };

    case DOCOMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          } else {
            return post;
          }
        }),
      };

    case DELETEPOST:
      return {
        ...state,
        posts: state.posts.filter((post) => {
          return post._id !== action.payload._id;
        }),
      };

    case ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
