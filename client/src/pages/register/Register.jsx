import React, { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("http://16.171.7.188:3003/api/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
      console.log(res);
    } catch (err) {
      // console.log(err);
      setError(true);
    }

    // console.log(res.data)
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form action="" className="registerForm" onSubmit={handleSubmit}>
        <label> Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="enter your username ..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label> Email</label>
        <input
          type="email"
          className="registerInput"
          placeholder="enter your email ..."
          onChange={(e) => setEmail(e.target.value)}
        />

        <label> Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="enter password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="LoginRegisterButton">
        <Link className="link" to="login">
          Login
        </Link>
      </button>
      {error && <span>SomeThing wrong .</span>}
    </div>
  );
};

export default Register;
