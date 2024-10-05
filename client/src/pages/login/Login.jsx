import React, { useContext, useRef } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";
const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "https://blog-api-or6z.onrender.com/api/auth/login",
        {
          username: userRef.current.value,
          password: passwordRef.current.value,
        }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  console.log(isFetching);
  return (
    <div className="">
      <div className="w-screen h-full flex items-center justify-center -mt-10 bg-gray-100 sm:px-6 lg:px-8">
        <div className="relative py-3 sm:max-w-xs sm:mx-auto">
          <form
            onSubmit={handleSubmit}
            className="min-h-96 px-8 py-6 mt-20 text-left bg-white  rounded-xl shadow-lg"
          >
            <div className="flex flex-col justify-center items-center h-full select-none">
              <div className="flex flex-col items-center justify-center gap-2 mb-8">
                <a href="https://amethgalarcio.web.app/" target="_blank">
                  <img
                    src="https://amethgalarcio.web.app/assets/logo-42fde28c.svg"
                    className="w-8"
                  />
                </a>
                <p className="m-0 text-[16px] font-semibold ">
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
                  className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none "
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
                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none"
                placeholder="••••••••"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="flex gap-2">
                <p className="text-sm">Don't have an Accout </p>
                <Link to="/register" className="text-sm text-blue-600">
                  SignUp
                </Link>
              </div>
            </div>
            <div className="mt-5">
              <button
                type="submit"
                disabled={isFetching}
                className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
