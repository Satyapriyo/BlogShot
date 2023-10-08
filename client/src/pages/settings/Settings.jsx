import React from "react";
import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
const Settings = () => {
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitele">Update Your Account</span>
          <span className="settingsDeleteTitele">Delete Account</span>
        </div>
        <form className="settingsForm">
          <label> Profile Picture</label>
          <div className="settingsPP">
            <img src="/aiImg.jpg" alt="" />
            <label htmlFor="fileInput">
              <i className=" settingsPPIcon fa-solid fa-circle-user fa-bounce"></i>
            </label>
            <input type="file" id="fileInput" style={{ display: "none" }} />
          </div>
          <label htmlFor="">Username</label>
          <input type="text" placeholder="Satyapriyo" name="" id="" />
          <label htmlFor="">Email</label>
          <input type="email" placeholder="" name="" id="" />
          <label htmlFor="">Username</label>
          <input type="text" placeholder="Satyapriyo@gmail.com" name="" id="" />
          <label htmlFor="">password</label>
          <input type="password" name="" id="" />
          <button className="settingsSubmit">Submit</button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
