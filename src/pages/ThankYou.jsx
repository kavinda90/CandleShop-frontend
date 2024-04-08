import React, { useEffect } from "react";
import { Container } from 'react-bootstrap';
import { SectionTitle } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { store } from "../store";
import { calculateTotals, clearCart } from "../features/cart/cartSlice";

const ThankYou = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveToOrderHistory = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/orders`, {
        userId: JSON.parse(localStorage.getItem("profile"))._id,
        orderStatus: "in progress",
        subtotal: total,
        cartItems: cartItems,
      });
    } catch (err) {
      toast.error(err.response);
    }
  };

  if (cartItems.length > 0) {
    saveToOrderHistory();
    store.dispatch(clearCart());
    store.dispatch(calculateTotals());
    toast.success("Order completed");
  }

  useEffect(() => {
    if (!loginState) {
      toast.error("You must be logged in to access this page");
      navigate("/");
    }
  }, []);


  return (
    <>
      <SectionTitle title="Thank You" path="Home | Cart | Thank you" />
      <Container className="text-center mt-5 px-3">
        <h2 className="display-4">Thank you for your purchase!</h2>

        <h3 className="mt-4">We appreciate your business and look forward to seeing you again soon.</h3>

        <h4 className="mt-4">Thank you again for your purchase!</h4>
        <h4 className="mt-2">Sincerely, Eternal Flame team</h4>
      </Container>
    </>
  );
};

export default ThankYou;
