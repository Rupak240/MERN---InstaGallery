import { SIGNUP, SIGNIN, ERROR, LOGOUT } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        message: action.payload,
        registered: true,
      };

    case SIGNIN:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return { ...state, ...action.payload, authenticated: true };

    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { ...state, authenticated: false };

    case ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
