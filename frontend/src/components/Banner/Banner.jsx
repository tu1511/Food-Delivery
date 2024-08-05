// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Banner.css"; // Import the CSS file
import { GrSecure } from "react-icons/gr";
import { IoFastFood } from "react-icons/io5";
import { GiFoodTruck } from "react-icons/gi";
import { assets } from "../../assets/assets";

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="banner-content">
        {/* Image section */}
        <div className="banner-image" data-aos="zoom-in">
          <img src={assets.banner} alt="Banner" />
        </div>
        {/* Text details section */}
        <div className="banner-details">
          <h1 data-aos="fade-up">Winter Sale upto 50% Off</h1>
          <p data-aos="fade-up">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
            reiciendis inventore iste ratione ex alias quis magni at optio
          </p>
          <div className="banner-features">
            <div className="feature-item" data-aos="fade-up">
              <GrSecure className="icon icon-violet" />
              <p>Quality Products</p>
            </div>
            <div className="feature-item" data-aos="fade-up">
              <IoFastFood className="icon icon-orange" />
              <p>Fast Delivery</p>
            </div>
            <div className="feature-item" data-aos="fade-up">
              <GiFoodTruck className="icon icon-green" />
              <p>Easy Payment method</p>
            </div>
            <div className="feature-item" data-aos="fade-up">
              <GiFoodTruck className="icon icon-yellow" />
              <p>Get Offers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
