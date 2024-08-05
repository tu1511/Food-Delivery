// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./ContactUs.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 40.73061, // Example coordinates (New York)
  lng: -73.935242,
};

const ContactUs = () => {
  const { url, token } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        url + "/api/contact/message",
        formData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success("Thank you for contacting us!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(
        "An error occurred while sending your message. Please try again."
      );
    }
  };

  return (
    <div className="contact-us">
      <div className="contact-us-header">
        <h1>Contact Us</h1>
      </div>
      <div className="contact-us-content">
        <section className="contact-us-section">
          <h2>Get in Touch</h2>
          <p>
            We'd love to hear from you! Please fill out the form below and we'll
            get back to you as soon as possible.
          </p>
        </section>
        <form onSubmit={handleSubmit} className="contact-us-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="contact-us-map">
        <h2>Our Location</h2>
        <LoadScript googleMapsApiKey="AIzaSyA9fs96ML4zZuEoSIBPULhnk6RIM0U3sPA">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={15}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default ContactUs;
