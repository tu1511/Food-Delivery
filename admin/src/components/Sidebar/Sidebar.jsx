// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import {
  MdDashboard,
  MdFastfood,
  MdShoppingCart,
  MdArrowForwardIos,
} from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";

const Sidebar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const toggleProducts = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink
          to="/dashboard"
          className="sidebar-option"
          activeClassName="active"
        >
          <MdDashboard className="sidebar-icon" />
          <p>Dashboard</p>
          <MdArrowForwardIos className="arrow-icon" />
        </NavLink>

        <NavLink to="/user" className="sidebar-option" activeClassName="active">
          <FaUserCircle className="sidebar-icon" />
          <p>User</p>
          <MdArrowForwardIos className="arrow-icon" />
        </NavLink>
        <div className="product">
          <div className="sidebar-option" onClick={toggleProducts}>
            <MdFastfood className="sidebar-icon " />
            <p>Products</p>
            <MdArrowForwardIos
              className={`arrow-icon  ${isProductsOpen ? "open" : ""}`}
            />
          </div>
          {isProductsOpen && (
            <ul className="product-submenu">
              <li>
                <NavLink to="/list" activeClassName="active">
                  <p>Products View</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/add" activeClassName="active">
                  <p>Upload Product</p>
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <NavLink
          to="/orders"
          className="sidebar-option"
          activeClassName="active"
        >
          <MdShoppingCart className="sidebar-icon" />
          <p>Orders</p>
          <MdArrowForwardIos className="arrow-icon" />
        </NavLink>
        <NavLink
          to="/contact"
          className="sidebar-option"
          activeClassName="active"
        >
          <RiMessage2Fill className="sidebar-icon" />
          <p>Messages</p>
          <MdArrowForwardIos className="arrow-icon" />
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
