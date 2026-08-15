import { useContext, useState, useEffect, useRef } from "react";
import "./App.css";
import Home from "../src/pages/home/Home";
import Single from "./pages/single/Single";
import Write from "../src/pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Route, Routes } from "react-router-dom";
import SinglePost from "./components/singlePost/SinglePost";
import About from "./pages/About/About";
import BlogEditor from "./components/BlogEditor/index";
import Lenis from "lenis";
import Bookmarks from "./pages/Bookmarks/Bookmarks";

import { Context } from "./context/Context";
import Contact from "./pages/Contact/Contact";
import Blogs from "./components/Blogs/Blogs";
import NewNavbr from "./components/NewNavbar/NewNavbar";
import EditBlogs from "./pages/EditBlogs";
import Loading from "./pages/Loading/index";
import NewWrite from "./pages/NewWrite";
import NewRegister from "./pages/NewRegister";
import Landing from "./pages/Landing";
import CommandPalette from "./components/CommandPalette/CommandPalette";
import { useAuthStore, useCategoryStore, usePostStore } from "./store";

function App() {
  // Use both Context (for backwards compatibility) and Zustand
  const { user: contextUser } = useContext(Context);
  const { user: zustandUser } = useAuthStore();
  const { fetchCategories } = useCategoryStore();
  const { fetchPosts } = usePostStore();

  // Use Zustand user if available, fallback to Context
  const user = zustandUser || contextUser;
  const commandPaletteRef = useRef(null);

  // Initialize app data
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await Promise.all([fetchCategories(), fetchPosts()]);
      } catch (err) {
        console.error("Error initializing app:", err);
      }
    };
    initializeApp();
  }, [fetchCategories, fetchPosts]);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  const openCommandPalette = () => {
    if (commandPaletteRef.current) {
      commandPaletteRef.current.open();
    }
  };

  return (
    <>
      <NewNavbr />
      <CommandPalette ref={commandPaletteRef} />
      <Routes>
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/" element={<Landing />} />
        <Route path="/editor/:postid" element={<EditBlogs />} />
        <Route path="/newregister" element={<NewRegister />} />
        <Route path="/newwrite" element={<NewWrite />} />
        <Route
          path="/blogs"
          element={<Home onOpenModal={openCommandPalette} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="login" element={user ? <Home /> : <Login />} />
        <Route path="settings" element={user ? <Settings /> : <Register />} />
        <Route path="register" element={user ? <Login /> : <Register />} />
        <Route path="write" element={user ? <Write /> : <Register />} />
        <Route path="post/:postid" element={<Single />} />
      </Routes>
    </>
  );
}

export default App;
