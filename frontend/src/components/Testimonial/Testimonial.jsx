import React from "react";
import Slider from "react-slick";
import "./Testimonial.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonial = () => {
  const testimonials = [
    {
      quote: "This product has changed my life for the better! Good luck!!!",
      author: "John Doe",
      position: "CEO of ExampleCorp",
      img: "https://picsum.photos/101/101",
    },
    {
      quote: "Incredible service and support. Highly recommend to everyone.",
      author: "Jane Smith",
      position: "CTO of TechSolutions",
      img: "https://picsum.photos/102/102",
    },
    {
      quote: "A truly outstanding experience from start to finish.",
      author: "Samuel Green",
      position: "Freelance Developer",
      img: "https://picsum.photos/103/103",
    },
    {
      quote: "Hi I am Tu, I am software engineering. Nice to meet you!",
      author: "Minh Tu",
      position: "Freelance Web Developer",
      img: "https://picsum.photos/104/104",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
    cssEase: "linear",
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 768, // Mobile breakpoint
        settings: {
          slidesToShow: 1, // Show only 1 slide on smaller screens
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="testimonial-section">
      <h2>What Our Clients Say</h2>
      <Slider {...settings} className="testimonial-slider">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="image">
              <img src={testimonial.img} alt="" />
            </div>
            <p className="testimonial-quote">"{testimonial.quote}"</p>
            <p className="testimonial-author">{testimonial.author}</p>
            <p className="testimonial-position">{testimonial.position}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonial;
