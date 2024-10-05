import React from "react";
import "./settings.css";
import {} from "@heroicons/react";
import userImage  from "../../assets/profile-default.svg";
import Sidebar from "../../components/sidebar/Sidebar";
const Settings = () => {
  return (
    <div className="settings -mt-10 bg-gray-100">
      <div className="settingsWrapper">
        <div className="settingsTitle  md:mb-10 mb-10">
          <span className="text-gray-700 md:text-xl font-medium ">
            Update Your Account
          </span>
          <button className=" btn  btn-error text-white">
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
        <form className="settingsForm bg-white shadow-xl max-w-[400px] md:pl-5 md:mx-auto">
          <label> Profile Picture</label>
          <div className="settingsPP">
            <img src={userImage} alt="" />
            <label htmlFor="fileInput">
              <i className=" settingsPPIcon fa-solid fa-circle-user fa-bounce"></i>
              <p className="mt-2">change profile icon</p>
            </label>
            <input type="file" id="fileInput" style={{ display: "none" }} />
          </div>
          

          <label htmlFor="" className="text-gray-700">
            Password
          </label>
          <input
            type="password"
            name=""
            id=""
            className="input bg-gray-100 text-black input-bordered w-full max-w-xs"
          />
          <label htmlFor="" className="text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            name=""
            id=""
            className="input bg-gray-100 text-black input-bordered w-full max-w-xs"
          />
          <button className="btn w-[300px] natural mx-auto mt-3 mb-10">
            Submit
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
