import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Signup = () => {
  const authContext = useContext(AuthContext);

  const { register, registered } = authContext;

  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    register(user);
    setUser({ name: "", email: "", password: "" });
  };

  const { name, email, password } = user;

  return (
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
          Signup to your Account
        </p>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="name"
            name="name"
            value={name}
            onChange={onChange}
          />
          <input
            type="text"
            placeholder="email"
            name="email"
            value={email}
            onChange={onChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={onChange}
          />
          <button
            className="btn waves-effect waves-light #64b5f5 blue bg-darken-1"
            type="submit"
            style={{ marginTop: "2rem", backgroundColor: "#64b5f5" }}
          >
            Signup
          </button>
        </form>
        <p style={{ marginTop: "1rem" }}>
          Already have an account ?<Link to="/login"> Sign In</Link>
        </p>
      </div>

      {registered ? <Redirect exact to="/login" /> : null}
    </div>
  );
};

export default Signup;
