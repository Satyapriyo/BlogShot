import { useContext, useState, useEffect } from "react";
import "./App.css";
import Navbar from "../src/components/Navbar/Navbar";
import Home from "../src/pages/home/Home";
import Single from "./pages/single/Single";
import Write from "../src/pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Route, Routes } from "react-router-dom";
import SinglePost from "./components/singlePost/SinglePost";
import About from "./pages/About/About";
import Lenis from "lenis";
import { Context } from "./context/Context";
import Contact from "./pages/Contact/Contact";
import Blogs from "./components/Blogs/Blogs";
function App() {
  const { user } = useContext(Context);
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="login" element={user ? <Home /> : <Login />} />
        <Route path="settings" element={user ? <Settings /> : <Register />} />
        <Route path="register" element={user ? <Login /> : <Register />} />
        <Route path="write" element={user ? <Write /> : <Register />} />
        <Route path="post/:postid" element={<Single />} />
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
