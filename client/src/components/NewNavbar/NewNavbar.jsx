import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logoNew from "../../assets/blogshot.png";
import userImage from "../../assets/profile-default.svg";

export default function NewNavbr() {
  const { user, dispatch } = useContext(Context);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Write", path: "/newwrite" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E3DDD0] bg-white/90 backdrop-blur-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3 sm:h-[4.5rem] sm:gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 transition-opacity hover:opacity-80"
          >
            <img
              alt="BlogShot"
              src={logoNew}
              width={120}
              height={40}
              className="h-8 sm:h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-sans relative px-4 py-2 text-sm font-medium text-[#1A1A18]/70 transition-colors duration-200 hover:text-[#1A1A18]"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:flex-1" />

          {/* User Section - Desktop */}
          <div className="hidden md:flex md:items-center md:gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="font-sans hidden text-sm text-[#1A1A18]/70 lg:block">
                  Hi {user.username}
                </span>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar h-10 w-10 p-0 ring-1 ring-[#E3DDD0] hover:ring-[#C75D3C]"
                  >
                    <div className="w-full overflow-hidden rounded-full">
                      <img
                        alt="user profile"
                        src={user.profilePic || userImage}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu w-48 border border-[#E3DDD0] bg-white p-2 font-sans shadow-lg"
                  >
                    <li>
                      <Link
                        to="/settings"
                        className="text-[#1A1A18]/80 hover:bg-[#1A1A18]/5 hover:text-[#1A1A18]"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="text-[#1A1A18]/80 hover:bg-[#C75D3C]/10 hover:text-[#C75D3C]"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="font-sans px-4 py-2 text-sm font-medium text-[#1A1A18]/70 transition-colors duration-200 hover:text-[#1A1A18]"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="font-sans rounded-full bg-[#1A1A18] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#C75D3C]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-full p-2.5 text-[#1A1A18] transition-colors duration-200 hover:bg-[#1A1A18]/5 md:hidden"
            aria-label="Toggle menu"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="md:hidden"
      >
        <div
          className="fixed inset-0 z-40 bg-[#1A1A18]/20"
          onClick={() => setMobileMenuOpen(false)}
        />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white shadow-xl sm:max-w-sm">
          <div className="flex items-center justify-between border-b border-[#E3DDD0] p-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-shrink-0"
            >
              <img
                alt="BlogShot"
                src={logoNew}
                width={100}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-full p-2 text-[#1A1A18] transition-colors hover:bg-[#1A1A18]/5"
              aria-label="Close menu"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="p-4">
            {/* Mobile Navigation Links */}
            <div className="divide-y divide-[#E3DDD0]">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-sans block py-3.5 text-base font-medium text-[#1A1A18]/80 transition-colors duration-200 hover:text-[#C75D3C]"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-4 border-t border-[#E3DDD0] pt-4">
              {user ? (
                <div className="space-y-2">
                  <Link
                    to="/settings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-sans block rounded-lg px-4 py-3 text-base font-medium text-[#1A1A18]/80 transition-colors duration-200 hover:bg-[#1A1A18]/5"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="font-sans block w-full rounded-lg px-4 py-3 text-left text-base font-medium text-[#C75D3C] transition-colors duration-200 hover:bg-[#C75D3C]/10"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-sans block rounded-lg px-4 py-3 text-center text-base font-medium text-[#1A1A18]/80 transition-colors duration-200 hover:bg-[#1A1A18]/5"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-sans block rounded-full bg-[#1A1A18] px-4 py-3 text-center text-base font-semibold text-white transition-colors duration-200 hover:bg-[#C75D3C]"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
