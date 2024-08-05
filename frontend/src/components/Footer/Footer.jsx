// eslint-disable-next-line no-unused-vars
import React from "react";
import { assets } from "../../assets/assets";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import "./Footer.css";

const FooterLinks = [
  {
    title: "Home",
    link: "/#",
  },
  {
    title: "Product",
    link: "/#blog",
  },
  {
    title: "About us",
    link: "/#about",
  },
  {
    title: "Contact us",
    link: "/#contact",
  },
];

const Services = [
  {
    title: "Help",
    link: "/#help",
  },
  {
    title: "Privacy & Policy",
    link: "/#policy",
  },
  {
    title: "Support",
    link: "/#support",
  },
  {
    title: "Knowledge Base",
    link: "/#knowledge",
  },
];

const Footer = () => {
  return (
    <div className="footer">
      <div className="app">
        <div data-aos="zoom-in" className="footer-grid">
          {/* company details */}
          <div className="footer-company">
            <h1 className="footer-title">
              <img
                src={assets.logo}
                alt="ReactShop Logo"
                className="footer-logo"
              />
              Food Delivery
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Creating
              repellents with diligence, hating and being that voluptuous,
              aspernatur temporarily selects the maximum condition, blandly
              accusing reasoning. Incident, self, desire!
            </p>
          </div>

          {/* Footer Links */}
          <div className="footer-links">
            <div>
              <div className="footer-section">
                <h1 className="footer-heading">Features</h1>
                <ul className="footer-list">
                  {FooterLinks.map((link) => (
                    <li className="footer-item" key={link.title}>
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Service */}
          <div className="footer-links">
            <div>
              <div className="footer-section">
                <h1 className="footer-heading">Services</h1>
                <ul className="footer-list">
                  {Services.map((link) => (
                    <li className="footer-item" key={link.title}>
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* social links */}
          <div className="footer-social">
            <div className="social-icons">
              <a href="https://github.com/tu1511">
                <FaGithub className="icon" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100018975219672&locale=vi_VN">
                <FaFacebook className="icon" />
              </a>
              <a href="https://www.linkedin.com/in/t%E1%BB%A9-minh-3277022a6/">
                <FaLinkedin className="icon" />
              </a>
            </div>
            <div className="contact-info">
              <div className="contact-item">
                <FaLocationArrow />
                <p>Can Tho, VietNam</p>
              </div>
              <div className="contact-item">
                <FaMobileAlt />
                <p>+84-337-731-011</p>
              </div>
              <div className="contact-item">
                <MdOutlineEmail />
                <p>minhtu15112k3@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 © FoodDelivery.com - All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
