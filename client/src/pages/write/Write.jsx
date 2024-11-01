import React, { useContext, useState } from "react";
import "./write.css";
import { Context } from "../../context/Context";
import axios from "axios";
const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  console.log(user.username);
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
      const res = await axios.post(
        "https://blog-api-or6z.onrender.com/api/post",
        newPost
      );
      window.location.replace("/post/" + res.data._id);
      console.log(res);
    } catch (err) {
      console.log("something wrong\n");
    }
  };
  return (
    <div className="write bg-black">
      {file && (
        <img
          src={URL.createObjectURL(file)}
          className="writeImg"
          alt="Image File"
        />
      )}
      <form className="writeForm bg-white" onSubmit={handleSubmit}>
        <div className="writeFormGroup flex justify-evenly">
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
            placeholder="Title"
            name=""
            id=""
            autoFocus={true}
            className="writeInput bg-white rounded-lg"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup mt-10 pl-28">
          <textarea
            placeholder="Tell your story......"
            className="writeInput bg-white rounded-xl writeText"
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
      </form>
      <button
        className="writeSubmit text-white hover:shadow-2xl hover:scale-105 duration-300  px-3 py-1 rounded-md"
        type="submit"
      >
        Publish
      </button>
    </div>
  );
};

export default Write;
