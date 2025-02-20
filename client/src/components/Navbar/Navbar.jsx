import "./Navbar.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import userImage from "../../assets/profile-default.svg";
import logoNew from "../../assets/Newlogo.svg";
const url = import.meta.env.VITE_API_URL;

const Navbar = () => {
  const { user, dispatch } = useContext(Context);
  const handelLogout = () => {
    const res = axios.post(`${url}/auth/logout`);
    console.log(res.json());
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top bg-transparent">
      <div className="topLeft">
        <img src={logoNew} width={120} alt="" />
      </div>
      <div className="topCenter">
        <ul className="topList">
          <Link className="link topListItem" to="/">
            Home
          </Link>
          <Link className="topListItem link" to="/about">
            About
          </Link>
          <Link className="topListItem link" to="/contact">
            Contact
          </Link>
          <Link className="topListItem link" to="/newwrite">
            Write
          </Link>
          <Link className="topListItem link" to="/login" onClick={handelLogout}>
            {user && "Logout"}
          </Link>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <img className="topImg" src={userImage} alt="img" srcSet="" /> //{user.profilePic}
        ) : (
          <>
            <Link className="topListItem link" to="login">
              Login
            </Link>{" "}
            <Link className="topListItem link" to="/register">
              Register
            </Link>
          </>
        )}
        <i className="topIconSearch fas fa-search"></i>
      </div>
    </div>
  );
};

export default Navbar;
