// eslint-disable-next-line no-unused-vars
import React from "react";
import "./AboutUs.css";
import AppDownload from "../../components/AppDownload/AppDownload";

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="about-us-header">
        <h1>About Us</h1>
      </div>
      <div className="about-us-content">
        <section className="about-us-section">
          <h2>Who We Are</h2>
          <p>
            Welcome to our company! We are dedicated to providing the best
            service and products to our customers. Our team works tirelessly to
            innovate and improve our offerings.
          </p>
        </section>
        <section className="about-us-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to deliver exceptional quality and value in
            everything we do. We believe in building strong relationships with
            our customers and partners, and we strive to exceed their
            expectations every day.
          </p>
        </section>
        <section className="about-us-section">
          <h2>Our Values</h2>
          <ul>
            <li>Customer Focus</li>
            <li>Innovation</li>
            <li>Integrity</li>
            <li>Teamwork</li>
            <li>Excellence</li>
          </ul>
        </section>
        <section className="about-us-section">
          <h2>Our Story</h2>
          <p>
            Our company was founded in [2003] with a vision to create something
            extraordinary. Over the years, we have grown and evolved, but our
            commitment to quality and customer satisfaction has remained
            unchanged.
          </p>
          <p>
            Thank you for choosing us. We look forward to serving you and making
            a positive impact together.
          </p>
        </section>
        <AppDownload />
      </div>
    </div>
  );
};

export default AboutUs;
