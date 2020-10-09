import React, { Fragment, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../context/user/userContext";

const UserProfile = () => {
  const { id } = useParams();
  //   console.log(id);

  const userContext = useContext(UserContext);

  const {
    user,
    userPosts,
    fetchUserProfile,
    followUser,
    following,
  } = userContext;

    console.log(user);
  console.log(following);

  const userDetails = JSON.parse(localStorage.getItem("user"));
  //   console.log(userDetails.following);

  useEffect(() => {
    fetchUserProfile(id);
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {userPosts.length > 0 ? (
        <div
          style={{
            maxWidth: "840px",
            margin: "0px auto",
          }}
        >
          <div className="wrap">
            <div className="container">
              <div className="container-row">
                <div className="container-img">
                  <img
                    src="https://images.unsplash.com/photo-1589654312430-20441681ac7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    alt="img"
                  />
                </div>
                <h4>{user.name}</h4>
                <h6>{user.email}</h6>
              </div>
              <div className="container-content">
                <div className="content-details">
                  <div className="posts">
                    <p>{userPosts.length}</p>
                    <span>posts</span>
                  </div>
                  <div className="followers">
                    <p>867</p>
                    <span>followers</span>
                  </div>
                  <div className="following">
                    <p>
                      {following.length > 0
                        ? Array.from(new Set(following)).length
                        : Array.from(new Set(userDetails.following)).length}
                    </p>
                    <span>following</span>
                  </div>
                </div>
                {following.includes(user._id) ? (
                  <button
                    className="btn waves-effect waves-light #64b5f5 blue bg-darken-1"
                    type="submit"
                    style={{ marginTop: "2rem", backgroundColor: "#64b5f5" }}
                    onClick={() => followUser(user._id)}
                  >
                    Following
                  </button>
                ) : (
                  <button
                    className="btn waves-effect waves-light #64b5f5 blue bg-darken-1"
                    type="submit"
                    style={{ marginTop: "2rem", backgroundColor: "#64b5f5" }}
                    onClick={() => followUser(user._id)}
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="gallery">
            {userPosts.map((post) => (
              <img src={post.photo} alt={post.body} key={post._id} />
            ))}
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </Fragment>
  );
};

export default UserProfile;
