import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import logo from "../../assets/b.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const url = import.meta.env.VITE_API_URL;
  const [isFetching, setIsFetching] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setError(false);

    if (!username.trim() || !email.trim() || !password.trim()) {
      setFormError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setFormError("Password should be at least 6 characters long.");
      return;
    }

    setIsFetching(true);
    try {
      const res = await axios.post(`${url}/auth/register`, {
        username,
        email,
        password,
      });
      console.log(res);
      toast.success("Account created successfully");
      setTimeout(() => {
        res.data && window.location.replace("/login");
      }, 1000);

      // console.log(res);
    } catch (err) {
      toast.error("Something went wrong");
      setError(true);
    } finally {
      setIsFetching(false);
    }
  };
  return (
    <div className="absolute top-0 z-50 w-[100vw] bg-white">
      <div className="">
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
                  <p className="m-0 text-[16px] font-semibold text-gray-700">
                    Create an Account
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
                    autoComplete="username"
                    className="border text-gray-700 bg-gray-100 rounded-lg px-3 py-2 mb-2 text-sm w-full outline-none "
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
                    autoComplete="email"
                    className="border text-gray-700 bg-gray-100 rounded-lg px-3 py-2 mb-2 text-sm w-full outline-none "
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="font-semibold text-xs text-gray-400 ">
                  Password
                </label>
                <div className="relative">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    className="border text-gray-700 bg-gray-100 rounded-lg px-3 py-2 mb-2 text-sm w-full outline-none pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-800 transition"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </button>
                </div>
              </div>
              {formError && (
                <p className="text-xs text-red-500 mb-3" role="alert">
                  {formError}
                </p>
              )}
              <div className="w-full flex flex-col gap-2">
                <div className="flex gap-2">
                  <p className="text-sm">Already have an account?</p>
                  <Link to="/login" className="text-sm text-blue-600">
                    Sign in
                  </Link>
                </div>
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  disabled={isFetching}
                  className="py-1 px-8 bg-blue-500 btn-slate hover:bg-blue-800 disabled:bg-blue-300 disabled:cursor-not-allowed focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
                >
                  {isFetching ? "Creating account..." : "Sign up"}
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

export default Register;
