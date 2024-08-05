// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import Testimonial from "../../components/Testimonial/Testimonial";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../../components/FoodItem/FoodItem";
import { useNavigate } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import Subscribe from "../../components/Subscribe/Subscribe";

const Home = () => {
  const [category, setCategory] = useState("All");
  const { food_list } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="food-display" id="food-display">
        <h2>Best seller</h2>
        <div className="food-display-list">
          {food_list.map((item, index) => {
            if ("Noodles" === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
          })}
        </div>
        <div className="food-display-btn">
          <button onClick={() => navigate("/products")}>See More </button>
        </div>
      </div>
      <hr className="hr" />
      <Banner />
      <Subscribe />
      <Testimonial />
    </div>
  );
};

export default Home;
