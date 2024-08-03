import React, { useContext, useState } from "react";
import "./write.css";
import { Context } from "../../context/Context";
import axios from "axios";
const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.photo = fileName;
      try {
        await axios.post("https://blog-api-or6z.onrender.com/api/upload", data);
      } catch (err) {
        console.log("the error is \n");
      }
    }
    try {
      const res = await axios.post("https://blog-api-or6z.onrender.com/api/post", newPost);
      window.location.replace("/post/" + res.data._id);
      console.log(res);
    } catch (err) {
      console.log("something wrong\n");
    }
  };
  // "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  return (
    <div className="write">
      {file && (
        <img
          src={URL.createObjectURL(file)}
          className="writeImg"
          alt="helloBaby"
        />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            name="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files.length != 0) {
                setFile(e.target.files[0]);
              }
            }}
          />
          <input
            type="text"
            placeholder="title"
            name=""
            id=""
            autoFocus={true}
            className="writeInput"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story......"
            className="writeInput writeText"
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
