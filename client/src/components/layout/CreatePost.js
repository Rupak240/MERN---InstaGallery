import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PostContext from "../../context/post/postContext";

const CreatePost = () => {
  const postContext = useContext(PostContext);

  const { imageUpload, imageUrl, createPost, postCreated } = postContext;

  const [post, setPost] = useState({ title: "", description: "" });
  const [image, setImage] = useState("");

  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instagallery");
    data.append("cloud_name", "instagallery");

    imageUpload(data);
  };

  useEffect(() => {
    if (imageUrl) {
      let postData = { title, body: description, url: imageUrl };

      // Making post request to the server (with all data) after getting the image url
      createPost(postData);
    }
    // eslint-disable-next-line
  }, [imageUrl]);

  const { title, description } = post;

  return (
    <div
      className="login-card"
      style={{
        height: "calc(100vh - 7rem)",
        paddingTop: "2rem",
      }}
    >
      <div
        className="card input-filed"
        style={{
          margin: "2.5rem auto",
          maxWidth: "500px",
          padding: "1.2rem",
          textAlign: "center",
          borderRadius: "5px",
        }}
      >
        <h2 style={{ marginTop: "1rem", marginBottom: "0", fontWeight: "300" }}>
          Create a Post
        </h2>
        <p style={{ margin: "1rem 0", fontWeight: "600" }}>
          Fill out all the details to create a post
        </p>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="title"
            name="title"
            value={title}
            onChange={onChange}
            style={{ marginTop: "1rem" }}
          />
          <input
            type="text"
            placeholder="description"
            name="description"
            value={description}
            onChange={onChange}
          />
          <div className="file-field input-field">
            <div className="btn #64b5f5 blue bg-darken-1">
              <span>Upload Image</span>
              <input
                type="file"
                files={image}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
          <button
            style={{ marginTop: "2rem" }}
            className="btn waves-effect waves-light #64b5f5 blue bg-darken-1"
          >
            Submit Post
          </button>
        </form>
      </div>

      {postCreated ? <Redirect exact to="/" /> : null}
    </div>
  );
};

export default CreatePost;
