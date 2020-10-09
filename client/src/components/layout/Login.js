import React, { useState, useContext, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Login = () => {
  const authContext = useContext(AuthContext);

  const { login, authenticated } = authContext;

  const [user, setUser] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    login(user);
    setUser({ email: "", password: "" });
  };

  const { email, password } = user;

  // Accessing Home page straight forward if user has token - user donot need to login again...
  if (localStorage.getItem("token")) {
    return <Redirect exact to="/" />;
  }

  return (
    <Fragment>
      {authenticated ? <Redirect exact to="/" /> : null}
      <div className="login-card">
        <div className="card login">
          <h2
            style={{
              color: "#222",
              fontFamily: "Grand Hotel",
              fontSize: "4rem",
            }}
          >
            Instagallery
          </h2>
          <p style={{ margin: "1rem", fontSize: "1.1rem" }}>
            Login to your Account
          </p>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="email"
              value={email}
              name="email"
              onChange={onChange}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              name="password"
              onChange={onChange}
            />
            <button
              className="btn waves-effect waves-light #64b5f5 blue bg-darken-1"
              type="submit"
              style={{ marginTop: "2rem", backgroundColor: "#64b5f5" }}
            >
              Login
            </button>
          </form>
          <p style={{ marginTop: "1rem" }}>
            Donot have an account ? <Link to="/signup"> Sign Up</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
