import { useState } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PhoneIcon, PlayCircleIcon } from "@heroicons/react/20/solid";
import logoNew from "../../assets/blogshot.png";
import userImage from "../../assets/profile-default.svg";

const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

export default function NewNavbr() {
  const { user, dispatch } = useContext(Context);
  const handelLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="md:p-4 p-3 z-50 w-full bg-gray-50 ">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className=" p-1.5">
            <img alt="" src={logoNew} width={120} height={10} />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-8">
          <Link
            to="/"
            className="text-sm font-semibold leading-6 hover:bg-gray-200 duration-300 rounded-md px-3.5 py-1.5 text-gray-900"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-sm font-semibold leading-6 hover:bg-gray-200 duration-300 rounded-md px-3.5 py-1.5 text-gray-900"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-sm font-semibold leading-6 hover:bg-gray-200 duration-300 rounded-md px-3.5 py-1.5 text-gray-900"
          >
            Contact
          </Link>
          <Link
            to="/newwrite"
            className="text-sm font-semibold leading-6 hover:bg-gray-200 duration-300 rounded-md px-3.5 py-1.5 text-gray-900"
          >
            Write
          </Link>
          {user && (
            <Link
              to="/settings"
              className="text-sm font-semibold leading-6 hover:bg-gray-200 duration-300 rounded-md px-3.5 py-1.5 text-gray-900"
            >
              Settings
            </Link>
          )}
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src={userImage} />
                </div>
              </div>
              <div className="shadow-xl">
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white shadow-xl text-black rounded-box z-[1] mt-3 w-32 p-2 "
                >
                  {/* <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge bg-gray-100 border-gray-100">New</span>
                  </a>
                </li> */}
                  <li className="hover:bg-slate-100 duration-200 rounded-lg w-28">
                    <Link to="/settings">Settings</Link>
                  </li>
                  <li className="hover:bg-slate-100 duration-200 rounded-lg w-28">
                    <Link to="/login" onClick={handelLogout}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div> //{user.profilePic}
          ) : (
            <div className="flex space-x-3">
              <Link
                className="text-sm font-semibold leading-6 duration-300 bg-gray-700 hover:bg-slate-600 rounded-md px-3.5 py-1.5 text-gray-100"
                to="/login"
              >
                Login
              </Link>{" "}
              <Link
                className="text-sm font-semibold leading-6 duration-300 rounded-md hover:bg-slate-200 px-3.5 py-1.5 text-gray-900"
                to="/register"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="#" className=" p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className=" rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Contact
                </Link>
                <Link
                  to="/write"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Write
                </Link>
                <Link
                  className="topListItem link "
                  to="/login"
                  onClick={handelLogout}
                >
                  {user && (
                    <div className="text-black font-semibold mt-2">Logout </div>
                  )}
                </Link>
              </div>
              <div className="py-2">
                {user ? (
                  <Link to="/settings" className="">
                    {" "}
                    <div className="w-10 rounded-full">
                      <img
                        className="topImg"
                        src={userImage}
                        alt="img"
                        srcSet=""
                      />
                    </div>
                  </Link>
                ) : (
                  <div>
                    <Link className="topListItem link" to="login">
                      Login
                    </Link>{" "}
                    <Link className="topListItem link" to="register">
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
