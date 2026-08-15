import React, { useContext, useState } from "react";
import "./settings.css";
import { Context } from "../../context/Context";
import userImage from "../../assets/profile-default.svg";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import uploadImg from "../../../public/upload.svg";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

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
        },
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
        err.response?.data?.message || "Failed to update password. Try again.",
      );
    }
  };

  return (
    <div className="settings bg-gradient-to-b from-white via-blue-50 to-white min-h-screen fontnew">
      <div className="settingsWrapper max-w-6xl mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Account Settings
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your profile and security preferences
              </p>
            </div>
            <motion.button
              className="p-3 rounded-full hover:bg-red-100 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById("my_modal_1").showModal()}
              title="Delete Account"
            >
              <img src={remove} width={32} height={32} alt="Delete Account" />
            </motion.button>
          </div>

          {/* Delete Account Modal */}
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box bg-white">
              <h3 className="font-bold text-lg text-red-600">Delete Account</h3>
              <p className="py-4 text-gray-600">
                Are you sure you want to delete your account? This action cannot
                be undone and all your data will be permanently removed.
              </p>
              <div className="modal-action">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-error text-white"
                >
                  Delete Permanently
                </motion.button>
                <form method="dialog">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-outline"
                  >
                    Cancel
                  </motion.button>
                </form>
              </div>
            </div>
          </dialog>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Profile Picture Section */}
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-3xl">🖼️</span>
                  Profile Picture
                </h2>

                <div className="flex items-center gap-8">
                  {/* Profile Image Display */}
                  <motion.div
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-gradient-to-r from-blue-400 to-purple-400 shadow-lg">
                      <img
                        src={file ? URL.createObjectURL(file) : userImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        Change
                      </span>
                    </div>
                  </motion.div>

                  {/* Upload Area */}
                  <label
                    htmlFor="fileInput"
                    className="flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed border-blue-300 rounded-2xl bg-blue-50 hover:bg-blue-100 cursor-pointer transition-all group"
                  >
                    <motion.img
                      src={uploadImg}
                      alt="upload"
                      width={40}
                      height={40}
                      className="mb-3 group-hover:scale-110 transition-transform"
                      whileHover={{ rotate: 10 }}
                    />
                    <p className="text-center">
                      <span className="font-semibold text-gray-900">
                        Click to upload
                      </span>
                      <br />
                      <span className="text-sm text-gray-600">
                        or drag and drop
                      </span>
                    </p>
                    {loading && (
                      <p className="text-blue-600 font-medium mt-2">
                        Uploading...
                      </p>
                    )}
                    {file && (
                      <p className="text-green-600 font-medium mt-2">✓ {img}</p>
                    )}
                  </label>

                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
              </motion.div>

              {/* Password Section */}
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-3xl">🔐</span>
                  Change Password
                </h2>

                <div className="space-y-5">
                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Use at least 8 characters with a mix of letters, numbers,
                      and symbols
                    </p>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <span>⚠️</span>
                      {error}
                    </motion.div>
                  )}

                  {/* Success Message */}
                  {success && (
                    <motion.div
                      className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <span>✓</span>
                      Profile updated successfully!
                    </motion.div>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full mt-6 px-6 py-3 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  style={{
                    background:
                      "linear-gradient(to right, rgb(37, 99, 235), rgb(168, 85, 247))",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Update Settings
                </motion.button>
              </motion.div>
            </form>
          </div>

          {/* Sidebar - Security Tips */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 sticky top-20">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Security Tips
              </h3>

              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-lg flex-shrink-0">🔒</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      Use a strong password
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Combine uppercase, lowercase, numbers, and symbols
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-lg flex-shrink-0">🔄</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      Change password regularly
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Update your password every 3-6 months
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-lg flex-shrink-0">🚫</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      Don't share your password
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Keep your credentials private and secure
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-lg flex-shrink-0">👤</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      Update your profile picture
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Use a recognizable and professional image
                    </p>
                  </div>
                </li>
              </ul>

              {/* Account Status */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4 text-sm">
                  Account Status
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-medium text-gray-900">
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* <Sidebar /> */}
      <Toaster position="top-right" />
    </div>
  );
};

export default Settings;
