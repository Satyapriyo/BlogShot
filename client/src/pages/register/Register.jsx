import React from "react";
import "./register.css";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className="register">
      <span className="registerTitle">Register</span>

      <form action="" className="registerForm">
        <label> Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="enter your username ..."
        />
        <label> Email</label>
        <input
          type="email"
          className="registerInput"
          placeholder="enter your email ..."
        />

        <label> Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="enter your email ..."
        />
        <button className="registerButton">Register</button>
      </form>
      <button className="LoginRegisterButton">
        <Link className="link" to="login">
          Login
        </Link>
      </button>
    </div>
  );
};

export default Register;
