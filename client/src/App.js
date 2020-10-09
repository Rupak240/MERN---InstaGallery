import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/layout/Home";
import Profile from "./components/layout/Profile";
import Login from "./components/layout/Login";
import Signup from "./components/layout/Signup";
import CreatePost from "./components/layout/CreatePost";
import AuthState from "./context/auth/AuthState";
import PostState from "./context/post/PostState";
import UserProfile from "./components/layout/UserProfile";
import UserState from "./context/user/UserState";

const App = () => {
  return (
    <UserState>
      <AuthState>
        <PostState>
          <Router>
            <div>
              <Navbar />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/createpost" exact component={CreatePost} />
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/profile/:id" exact component={UserProfile} />
              </Switch>
            </div>
          </Router>
        </PostState>
      </AuthState>
    </UserState>
  );
};

export default App;
