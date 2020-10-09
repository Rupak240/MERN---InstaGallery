import React, { useReducer } from "react";
import axios from "axios";
import M from "materialize-css";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import { SIGNUP, SIGNIN, ERROR, LOGOUT } from "../types";

const AuthState = (props) => {
  const initialState = {
    users: [],
    error: "",
    registered: false,
    authenticated: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Register User
  const register = async (userData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/signup", userData, config);
      console.log(res.data);
      console.log(res.data.msg);
      dispatch({ type: SIGNUP, payload: res.data.msg });

      M.toast({ html: res.data.msg, classes: "#43a047 green darken-1" });
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({ type: ERROR, payload: error.response.data.msg });

      M.toast({
        html: error.response.data.msg,
        classes: "#c62828 red darken-3",
      });
    }
  };

  //   Login User
  const login = async (userData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/signin", userData, config);

      console.log(res);
      dispatch({ type: SIGNIN, payload: res.data });

      M.toast({ html: res.data.msg, classes: "#43a047 green darken-1" });
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({ type: ERROR, payload: error.response.data.msg });

      M.toast({
        html: error.response.data.msg,
        classes: "#c62828 red darken-3",
      });
    }
  };

  // Logout User
  const logout = () => {
    dispatch({type: LOGOUT})
  }

  return (
    <AuthContext.Provider
      value={{
        users: state.users,
        error: state.error,
        message: state.message,
        registered: state.registered,
        authenticated: state.authenticated,
        register,
        login, logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
