import React, { Fragment, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const { authenticated, logout } = authContext;

  const history = useHistory();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token && !authenticated) {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, [token, authenticated]);

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <li>
        <Link
          to="/"
          style={{ color: "#222", padding: "0 1.5rem", fontSize: "1.2rem" }}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/profile"
          style={{ color: "#222", padding: "0 1.5rem", fontSize: "1.2rem" }}
        >
          Profile
        </Link>
      </li>
      <li>
        <Link
          to="/createpost"
          style={{ color: "#222", padding: "0 1.5rem", fontSize: "1.2rem" }}
        >
          CreatePost
        </Link>
      </li>
      <li style={{ marginRight: "1rem" }}>
        <button
          className="btn #c62828 red darken-3"
          to="/logout"
          onClick={onLogout}
        >
          Logout
        </button>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/login" style={{ color: "#222" }}>
          Signin
        </Link>
      </li>
      <li>
        <Link to="/signup" style={{ color: "#222" }}>
          Signup
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav>
      <div className="nav-wrapper white">
        <Link
          to="/"
          className="brand-logo left"
          style={{
            color: "#222",
            marginLeft: "1rem",
            fontFamily: "Grand Hotel",
            fontSize: "2.5rem",
          }}
        >
          InstaGallery
        </Link>
        <ul id="nav-mobile" className="right">
          {token ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
