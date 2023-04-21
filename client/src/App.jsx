import { useState } from "react";
import "./App.css";
import Navbar from "../src/components/Navbar/Navbar";
import Home from "../src/pages/home/Home";
import Single from "./pages/single/Single";
import Write from "../src/pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Route,Routes } from "react-router-dom";
import SinglePost from "./components/singlePost/SinglePost";
function App() {
  const user =false;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="login" element={user? <Home/> : <Login/>}/>
        <Route path="settings" element={user? <Settings/> : <Register/>}/>
        <Route path="register" element={user?<Login/>:<Register/>}/>
        <Route path="write" element={user? <Write/> : <Register/>}/>
        <Route path="post/:postid" element={<Single/>}/>
      </Routes>
      {/* <Home /> */}
      {/* <Single/> */}
      {/* <Write/> */}
      {/* <Settings /> */}
      {/* <Login/> */}
      {/* <Register/> */}
    </>
  );
}

export default App;
