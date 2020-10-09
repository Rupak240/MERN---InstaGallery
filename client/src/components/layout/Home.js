import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import PostContext from "../../context/post/postContext";

const Home = () => {
  const postContext = useContext(PostContext);

  const {
    fetchPosts,
    posts,
    likePost,
    unlikePost,
    doComment,
    deletePost,
  } = postContext;

  console.log(posts);

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, []);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) return <Redirect exact to="/login" />;

  return (
    <div className="home">
      <div className="home-card">
        {posts.length > 0 &&
          posts.map((post) => (
            <div className="card card-container" key={post._id}>
              <div className="card-image">
                <img src={post.photo} alt={post.body} />
              </div>
              <div
                className="card-content"
                style={{ padding: "1.3rem 1.8rem" }}
              >
                <div
                  className="card-main"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {post.postedBy._id === user._id ? (
                    <h5 style={{ marginTop: "0.4rem" }}>
                      <Link to="/profile">{post.postedBy.name}</Link>
                    </h5>
                  ) : (
                    <h5>
                      <Link to={`/profile/${post.postedBy._id}`}>
                        {post.postedBy.name}
                      </Link>
                    </h5>
                  )}

                  <div className="card-icons">
                    {post.likes.includes(user._id) ||
                    post.likes.includes(post.postedBy._id) ? (
                      <i
                        className="material-icons"
                        style={{
                          cursor: "pointer",
                          color: "red",
                          padding: "0 1.5rem",
                        }}
                        onClick={() => {
                          unlikePost(post._id);
                          // window.location.reload(false);
                        }}
                      >
                        thumb_up
                      </i>
                    ) : (
                      <i
                        className="material-icons"
                        style={{
                          cursor: "pointer",
                          color: "black",
                          padding: "0 1.5rem",
                        }}
                        onClick={() => {
                          likePost(post._id);
                          // window.location.reload(false);
                        }}
                      >
                        thumb_up
                      </i>
                    )}
                    <i
                      className="material-icons"
                      style={{ color: "red", cursor: "pointer" }}
                    >
                      favorite
                    </i>
                    {post.postedBy._id === user._id && (
                      <i
                        className="material-icons"
                        style={{
                          color: "#222",
                          cursor: "pointer",
                          paddingLeft: "1.5rem",
                        }}
                        onClick={() => deletePost(post._id)}
                      >
                        delete
                      </i>
                    )}
                  </div>
                </div>
                <h6>{Array.from(new Set(post.likes)).length} likes</h6>
                <h6>{post.title}</h6>
                <p style={{ marginBottom: "1rem" }}>{post.body}</p>
                {post.comments.length > 0 ? (
                  <h6 style={{ fontWeight: "500", marginBottom: ".8rem" }}>
                    Comments
                  </h6>
                ) : (
                  <h6>No Comments</h6>
                )}

                {post.comments.map((comment) => (
                  <h6 key={comment._id}>
                    <span style={{ fontWeight: "500" }}>
                      {comment.postedBy.name}
                    </span>{" "}
                    &nbsp;&nbsp;
                    {comment.text}
                  </h6>
                ))}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();

                    doComment(e.target[0].value, post._id);

                    e.target[0].value = "";
                  }}
                >
                  <input type="text" placeholder="add a comment" />
                </form>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
