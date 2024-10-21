import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const NewRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const handleSubmit = async (e) => {
    setIsFetching(true);
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post(
        "https://blog-api-or6z.onrender.com/api/auth/register",
        {
          username,
          email,
          password,
        }
      );
      console.log(res);
      toast.success("Account created successfully");
      setTimeout(() => {
        res.data && window.location.replace("/login");
      }, [1000]);

      // console.log(res);
    } catch (err) {
      toast.error("Something went wrong");
      setError(true);
    } finally {
      setIsFetching(false);
    }
  };
  return (
    <div className="bg-white">
      <div className="">
        <div className="w-full  flex items-center justify-center h-[100vh] -mt-10  bg-gray-100 sm:px-6 lg:px-8">
          <div className="relative py-3 -mt-56 md:-mt-52 sm:max-w-xs sm:mx-auto">
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
                    onChange={(e) => setUsername(e.target.value)}
                    className="border bg-gray-100 rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none "
                    placeholder="Username"
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label className="font-semibold text-xs text-gray-400 ">
                    Email
                  </label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="border bg-gray-100 rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none "
                    placeholder="Username"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="font-semibold text-xs text-gray-400 ">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="border bg-gray-100 rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none"
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
                  SignUp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default NewRegister;
