import React, { useContext, useState } from "react";
import "./settings.css";
import { Context } from "../../context/Context";
import userImage from "../../assets/profile-default.svg";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import uploadImg from "../../../public/upload.svg";
import toast, { Toaster } from "react-hot-toast";

import remove from "../../../public/remove.svg";

const Settings = () => {
  const url = import.meta.env.VITE_API_URL;
  const { user } = useContext(Context);
  const [img, setImg] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFile(e.target.files[0]);
    setImg(e.target.files[0].name);
    const files = e.target.files[0];

    if (files) {
      const data = new FormData();
      data.append("file", files);
      data.append("upload_preset", "practice01");
      data.append("cloud_name", "duyocx2j0");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/duyocx2j0/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const uploadedImage = await res.json();
      console.log(uploadedImage.url);
      setImageurl(uploadedImage.url);
    }
    setLoading(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    if (!password || !confirmPassword) {
      setError("Please enter a new password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    console.log(user);
    const updatedUser = {
      userId: user._id,
      password,
      profilePic: imageurl,
    };

    try {
      const res = await axios.put(`${url}/user/${user._id}`, updatedUser, {
        withCredentials: true, // Ensure cookies are sent
      });
      setSuccess(true);
      toast.success("Successfully Logged In.");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
      setError(
        err.response?.data?.message || "Failed to update password. Try again."
      );
    }
  };

  return (
    <div className="settings bg-gray-100 fontnew">
      <div className="settingsWrapper">
        <div className="settingsTitle md:mb-10 mb-10">
          <span className="text-gray-700 md:text-3xl font-medium">
            Update Your Account
          </span>
          <button
            className="  mt-2 tooltip"
            data-tip="Delete Account"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            <img src={remove} width={30} height={30} alt="" />
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <p className="py-4">
                Press ESC key or click the button below to close
              </p>
              <div className="modal-action">
                <button
                  // onClick={handleDelete}
                  className=" btn text-white  btn-error"
                >
                  Delete
                </button>
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>

        <form
          className="settingsForm bg-white rounded-xl shadow-xl max-w-[330px] p-10 md:mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col mx-auto">
            <label className="font-bold text-xl">Profile Picture</label>
            <div className="settingsPP">
              <img
                src={file ? URL.createObjectURL(file) : userImage}
                alt="Profile"
              />
              <label htmlFor="fileInput">
                <img
                  className="cursor-pointer"
                  src={uploadImg}
                  alt="uploadImage"
                  width={30}
                  height={30}
                />
                <p className="mt-2">
                  {loading ? "Loading..." : file ? img : "Upload Image"}
                </p>
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <h1 className="md:text-2xl mt-3 font-bold">Update password</h1>
            <label className="text-gray-700 text-lg mt-4 my-2">Password</label>
            <input
              type="password"
              className="input bg-gray-100 text-black input-bordered w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="text-gray-700 text-lg mt-4 my-2">
              Confirm Password
            </label>
            <input
              type="password"
              className="input bg-gray-100 text-black input-bordered w-full max-w-xs"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && (
              <p className="text-green-500 mt-2">
                Profile updated successfully!
              </p>
            )}
            <button className="btn  mx-auto mt-3 md:mt-6">Submit</button>
          </div>
        </form>
      </div>
      <Sidebar />
      <Toaster />
    </div>
  );
};

export default Settings;

