// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./Subscribe.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (validator.isEmail(email)) {
        toast.success("Thank you for subscribing!");
        setEmail("");
      } else {
        toast.error("Please enter a valid email address.");
      }
    }
  };

  return (
    <div data-aos="zoom-in" className="subscribe-section">
      <ToastContainer />
      <div className="subscribe-container">
        <div className="subscribe-content">
          <h1 className="subscribe-title">Get Notified About New Products</h1>
          <input
            data-aos="fade-up"
            type="text"
            placeholder="Enter your email"
            className="subscribe-input"
            value={email}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
