import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form action="" className="loginForm">
        <label> Email</label>
        <input
          type="email"
          className="loginInput"
          placeholder="enter your email ..."
        />

        <label> Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="enter your email ..."
        />
        <button className="loginButton">Login</button>
      </form>
      <button className="LoginRegisterButton"><Link className="link" to="register">Register</Link></button>
    </div>
  );
};

export default Login;
