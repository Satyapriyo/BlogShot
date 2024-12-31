import React, { useContext, useRef } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import logo from "../../assets/b.png"
const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const url = import.meta.env.VITE_API_URL;
  const { user, dispatch, isFetching } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        `${url}/auth/login`,
        {
          username: userRef.current.value,
          password: passwordRef.current.value,
        },
        { withCredentials: true }
      );
      toast.success("Successfully Logged In.");
      const decoded = jwtDecode(res.data.token);
      setTimeout(() => {
        dispatch({ type: "LOGIN_SUCCESS", payload: decoded });
      }, [1000]);
      console.log(decoded);
    } catch (err) {
      toast.error("Username or Password wrong.");
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="absolute top-0 w-[100vw] z-50">
      <div className="w-full  flex items-center justify-center h-[100vh]  bg-gray-100 sm:px-6 lg:px-8">
        <div className="relative py-3 -mt-56 md:-mt-52 sm:max-w-xs sm:mx-auto">
          <form
            onSubmit={handleSubmit}
            className="min-h-96 px-8 py-6 mt-20 text-left bg-white  rounded-xl shadow-lg"
          >
            <div className="flex flex-col justify-center items-center h-full select-none">
              <div className="flex flex-col items-center justify-center gap-2 mb-8">
                <a href="/" target="_blank">
                  <img
                    src={logo}
                    className="w-8"
                  />
                </a>
                <p className="m-0 text-[16px] font-semibold text-gray-700 ">
                  Login to your Account
                </p>
                <span className="m-0 text-xs max-w-[90%] text-center text-[#8B8E98]">
                  Get started with our app, just start section and enjoy
                  experience.
                </span>
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="font-semibold text-xs text-gray-400 ">
                  Username
                </label>
                <input
                  ref={userRef}
                  className="border text-gray-700 bg-gray-100 rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none "
                  placeholder="Username"
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold text-xs text-gray-400 ">
                Password
              </label>
              <input
                ref={passwordRef}
                type="password"
                className="border bg-gray-100 text-gray-700 rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none"
                placeholder="••••••••"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="flex gap-2">
                <p className="text-sm text-gray-700">Don't have an Accout ? </p>
                <Link to="/register" className="text-sm text-blue-600">
                  SignUp
                </Link>
              </div>
            </div>
            <div className="mt-5">
              <button
                type="submit"
                disabled={isFetching}
                className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full btn-slate transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
