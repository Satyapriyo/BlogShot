import { useState, useContext, useEffect } from "react";
import EditorSection from "../../components/EditorSection";
import { Context } from "../../context/Context";
import Prism from "prismjs";
import "./style.css";
import axios from "axios";
const NewWrite = () => {
  const { user } = useContext(Context);
  const url = import.meta.env.VITE_API_URL;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [catagory, setCatagories] = useState("");
  useEffect(() => {
    Prism.highlightAll(); // Automatically highlights all code blocks
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      catagories: [catagory],
      photo: "",
    };
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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            name=""
            id=""
            autoFocus={true}
            className="h-full border-none outline-none focus:border-none focus:outline-none mt-10 w-[70vw] mx-auto bg-white text-6xl font-bold text-black rounded-lg"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="">
            <EditorSection setDesc={setDesc} className="w-[70vw] mx-auto " />
          </div>
          <div>
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
          <button type="submit" className="btn btn-slate  ml-5 mt-10 mb-20">
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};
export default NewWrite;
