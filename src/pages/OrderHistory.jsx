import React, { useEffect, useState } from "react";

import { Container, Accordion, Table, Button } from 'react-bootstrap';
import { SectionTitle } from "../components";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const OrderHistory = () => {
  // cancelled, in progress, delivered
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const getOrderHistory = async () => {
    try {
      // saljemo get(default) request
      const response = await axios.get(`${process.env.REACT_APP_API}/orders`);
      const data = response.data;
      setOrders(
        data.filter((order) => order.userId === JSON.parse(localStorage.getItem("profile"))._id)
      );
    } catch (error) {
      toast.error(error.response);
    }
  };

  useEffect(() => {
    if (!loginState) {
      toast.error("You must be logged in to access this page");
      navigate("/");
    } else {
      getOrderHistory();
    }
  }, []);

  return (
    <>
      <SectionTitle title="Order History" path="Home | Order History" />
      <Container className="mt-5 px-md-3" style={{ maxWidth: '1140px' }}>
      {orders?.length === 0 ? (
        <div className="text-center">
          <h1>There are no orders in the order history</h1>
          <Link to="/shop">
            <Button variant="primary" className="mt-4">Make your first order</Button>
          </Link>
        </div>
      ) : (
        orders.map((order, index) => (
          <Accordion defaultActiveKey="0" className="mb-3" key={order._id}>
            <Accordion.Item eventKey={index.toString()}>
              <Accordion.Header>Order {order._id} - {order.orderStatus}</Accordion.Header>
              <Accordion.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Size</th>
                      <th>Amount</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cartItems.map((product, counter) => (
                      <tr key={product._id}>
                        <td>{counter + 1}</td>
                        <td><img src={`${process.env.REACT_APP_PUBLIC_URL}/img/${product.image}`} alt="" style={{ width: '40px' }} /></td>
                        <td>{product.title}</td>
                        <td>{product.selectedSize}</td>
                        <td>{product.amount}</td>
                        <td>${(product.price * product.amount).toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="6" className="text-center">Subtotal: ${(order?.subtotal).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="6" className="text-center">Shipping: $50.00</td>
                    </tr>
                    <tr>
                      <td colSpan="6" className="text-center">Tax: 20%: ${(order?.subtotal / 5).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="6" className="text-center">Order Total: ${(order?.subtotal + 50 + (order?.subtotal / 5)).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))
      )}
    </Container>
    </>
  );
};

export default OrderHistory;
