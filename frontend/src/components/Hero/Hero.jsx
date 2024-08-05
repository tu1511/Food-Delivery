// eslint-disable-next-line no-unused-vars
import React from "react";
import Slider from "react-slick";
import "./Hero.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { assets } from "../../assets/assets";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const slides = [
    {
      id: 1,
      image: assets.banner_1,
    },
    {
      id: 2,
      image: assets.banner_2,
    },
    {
      id: 3,
      image: assets.banner_3,
    },
  ];

  return (
    <div className="hero-slider">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="slide">
            <img src={slide.image} alt={slide.title} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
