// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { getTotalCartAmount, food_list, cartItems, url, token } =
    useContext(StoreContext);
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const onPaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      paymentMethod, // Add paymentMethod to orderData
    };

    if (paymentMethod === "stripe") {
      // Call Stripe API
      let response = await axios.post(url + "/api/order/stripe", orderData, {
        headers: { token },
      });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
        toast.success("Order placed successfully");
      } else {
        alert("Error placing order");
      }
    } else if (paymentMethod === "cod") {
      // Handle COD payment method
      let response = await axios.post(url + "/api/order/cod", orderData, {
        headers: { token },
      });
      if (response.data.success) {
        toast.success("Order placed successfully");
        navigate("/myorders");
      } else {
        alert("Error placing order");
      }
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <div className="paymentMethod">
            <h2>Payment Method</h2>
            <div className="paymentMethod-items">
              <div className="paymentMethod-item">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="cod"
                  value="cod"
                  onChange={onPaymentMethodChange}
                ></input>
                <label htmlFor="cod">
                  <h3>COD (Cash on delivery)</h3>
                </label>
              </div>
              <div className="paymentMethod-item">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="stripe"
                  value="stripe"
                  onChange={onPaymentMethodChange}
                ></input>
                <label htmlFor="stripe">
                  <h3>Stripe (Credit/Debit)</h3>
                </label>
              </div>
            </div>
          </div>

          <button type="submit">Place Order</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
