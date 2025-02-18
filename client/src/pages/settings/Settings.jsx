import React, { useContext, useState } from "react";
import "./settings.css";
import { Context } from "../../context/Context";
import userImage from "../../assets/profile-default.svg";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import uploadImg from "../../../public/upload.svg";
import toast, { Toaster } from "react-hot-toast";

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
    <div className="settings bg-gray-100">
      <div className="settingsWrapper">
        <div className="settingsTitle md:mb-10 mb-10">
          <span className="text-gray-700 md:text-3xl font-medium">
            Update Your Account
          </span>
          <button className="btn btn-error text-white">
            <div className="tooltip" data-tip="Delete Account">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
          </button>
        </div>

        <form
          className="settingsForm bg-white rounded-xl shadow-xl max-w-[400px] p-10 md:mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col mx-auto">
            <label className="font-bold">Profile Picture</label>
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
            <h1 className="md:text-2xl mt-3 font-bold">Change the password</h1>
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
            <button className="btn  mx-auto mt-3 mb-10 md:mt-6">Submit</button>
          </div>
        </form>
      </div>
      <Sidebar />
      <Toaster />
    </div>
  );
};

export default Settings;
