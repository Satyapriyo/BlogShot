import { useState, useContext, useEffect } from "react";
import EditorSection from "../../components/EditorSection";
import { Context } from "../../context/Context";
import { PlusIcon } from "@heroicons/react/24/outline";

import Prism from "prismjs";
import "./style.css";
import axios from "axios";
const NewWrite = () => {
  const { user } = useContext(Context);
  const url = import.meta.env.VITE_API_URL;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [catagory, setCatagories] = useState("");
  useEffect(() => {
    Prism.highlightAll(); // Automatically highlights all code blocks
  }, []);
  if (!user) {
    window.location.href = "/";
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newPost = {
      username: user.username,
      title,
      desc,
      catagories: [catagory],
      photo: "",
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
      const res = await axios.post(`${url}/post`, newPost);
      window.location.replace("/post/" + res.data._id);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-white z-50 w-full h-full min-h-[90vh] items-center flex flex-col new">
      <div>
        {file && (
          <img
            src={URL.createObjectURL(file)}
            className="writeImg"
            alt="Image File"
          />
        )}
        <form onSubmit={handleSubmit}>
          <div className="writeFormGroup flex justify-evenly">
            <label htmlFor="fileInput">
              <PlusIcon className=" writeIcon" />
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
              className="h-full border-none outline-none focus:border-none focus:outline-none mt-10 w-[70vw] mx-auto bg-white text-6xl font-bold text-black rounded-lg"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* <input
            type="text"
            placeholder="Title"
            name=""
            id=""
            autoFocus={true}
            className="h-full border-none outline-none focus:border-none focus:outline-none mt-10 w-[70vw] mx-auto bg-white text-6xl font-bold text-black rounded-lg"
            onChange={(e) => setTitle(e.target.value)}
          /> */}
          <div className="writeFormGroup">
            <EditorSection
              setDesc={setDesc}
              className="w-[70vw] mx-auto text-black"
            />
          </div>
          <div className="writeFormGroup">
            <input
              type="text"
              placeholder="Catagory"
              name=""
              id=""
              autoFocus={true}
              className="writeInput mt-10 w-[70vw] mx-auto bg-white text-2xl font-bold text-black rounded-lg"
              onChange={(e) => setCatagories(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <button type="submit" className="btn btn-slate  ml-5 mt-10 mb-20">
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default NewWrite;
