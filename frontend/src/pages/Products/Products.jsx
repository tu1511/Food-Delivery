// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./Products.css";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import Hero from "../../components/Hero/Hero";

const Products = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Hero />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  );
};

export default Products;
