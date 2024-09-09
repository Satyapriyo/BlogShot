import "./Navbar.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import userImage from "../../assets/profile-default.svg";
const Navbar = () => {
  const { user, dispatch } = useContext(Context);
  const handelLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fa-brands fa-square-instagram"></i>
        <i className="topIcon fa-brands fa-square-facebook"></i>
        <i className="topIcon fa-brands fa-pinterest"></i>
        <i className="topIcon fa-brands fa-square-twitter"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <Link className="link topListItem" to="/">
            Home
          </Link>
          <Link className="topListItem link" to="about">
            About
          </Link>
          <Link className="topListItem link" to="contacts">
            Contact
          </Link>
          <Link className="topListItem link" to="write">
            Write
          </Link>
          <Link className="topListItem link" to="login" onClick={handelLogout}>
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
            <Link className="topListItem link" to="register">
              Registet
            </Link>
          </>
        )}
        <i className="topIconSearch fas fa-search"></i>
      </div>
    </div>
  );
};

export default Navbar;
