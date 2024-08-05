// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = (event) => {
    event.preventDefault();

    // Check if name and password match the expected values
    if (data.name === "admin" && data.password === "1511") {
      // Authentication successful
      navigate("/dashboard");
      toast.success("Login successful");
      // Optionally, you can set up some state or context to indicate logged-in status
    } else {
      // Authentication failed
      toast.error("Incorrect name or password");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>Login</h2>
        </div>
        <div className="login-popup-inputs">
          <input
            type="text"
            name="name"
            onChange={onChangeHandler}
            value={data.name}
            placeholder="Your name"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
