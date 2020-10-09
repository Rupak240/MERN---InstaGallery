import React, { Fragment, useContext, useEffect } from "react";
import PostContext from "../../context/post/postContext";

const Profile = () => {
  const postContext = useContext(PostContext);

  const { fetchProfilePosts, profilePosts } = postContext;

  // console.log(profilePosts);

  const userDetails = JSON.parse(localStorage.getItem("user"));
  // console.log(userDetails);

  useEffect(() => {
    fetchProfilePosts();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
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
              <h4>{userDetails.name}</h4>
            </div>
            <div className="container-content">
              <div className="content-details">
                <div className="posts">
                  <p>1,877</p>
                  <span>posts</span>
                </div>
                <div className="followers">
                  <p>867</p>
                  <span>followers</span>
                </div>
                <div className="following">
                  <p>77</p>
                  <span>following</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="gallery">
          {profilePosts.map((post) => (
            <img src={post.photo} alt={post.body} key={post._id} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
