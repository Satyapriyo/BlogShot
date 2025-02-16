import React, { useContext, useState } from "react";
import "./settings.css";
import { Context } from "../../context/Context";
import userImage from "../../assets/profile-default.svg";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";

const Settings = () => {
  const url = import.meta.env.VITE_API_URL;
  const { user } = useContext(Context);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState(user?.username || "");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    if (password && password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const updatedUser = {
      userId: user._id,
      username,
      ...(password && { password }),
    };

    try {
      await axios.put(`${url}/user/${user._id}`, updatedUser);
      setSuccess(true);
    } catch (err) {
      setError("Failed to update profile. Try again.");
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
          className="settingsForm bg-white shadow-xl max-w-[400px] md:pl-16 md:mx-auto p-6"
          onSubmit={handleSubmit}
        >
          <label> Profile Picture</label>
          <div className="settingsPP">
            <img src={file ? URL.createObjectURL(file) : userImage} alt="Profile" />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon fa-solid fa-circle-user fa-bounce"></i>
              <p className="mt-2">Change profile icon</p>
            </label>
            <input type="file" id="fileInput" style={{ display: "none" }} onChange={handleFileChange} />
          </div>

          <label className="text-gray-700 mt-4">Username</label>
          <input
            type="text"
            className="input bg-gray-100 text-black input-bordered w-full max-w-xs"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="text-gray-700 mt-4">Password</label>
          <input
            type="password"
            className="input bg-gray-100 text-black input-bordered w-full max-w-xs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="text-gray-700 mt-4">Confirm Password</label>
          <input
            type="password"
            className="input bg-gray-100 text-black input-bordered w-full max-w-xs"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">Profile updated successfully!</p>}

          <button className="btn  mx-auto mt-3 mb-10 md:mt-6">
            Submit
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
