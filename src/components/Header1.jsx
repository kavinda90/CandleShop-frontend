import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaOpencart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { AiFillShopping } from "react-icons/ai";

import "../styles/Header.css";
import { useDispatch, useSelector } from "react-redux";

const CustomNavbar = () => {
    const { amount } = useSelector((state) => state.cart);
    const { total } = useSelector((state) => state.cart);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [id, setId] = useState(localStorage.getItem("id"));
    const dispatch = useDispatch();

    const loginState = useSelector((state) => state.auth.isLoggedIn);
  
  
    useEffect(() => {
      setIsLoggedIn(loginState);
      
    }, [loginState]);
  return (
    <>
      <Navbar expand="lg" className="border-bottom gray-800">
        <Container>
          <Nav >
            <LinkContainer to="/">
              <Nav.Link><img src="/logo-cropped.png" alt='logo-dark' style={{ maxWidth: '100px' }} /></Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className="mx-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/shop">
              <Nav.Link>Shop</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about-us">
              <Nav.Link>About Us</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>
            {!isLoggedIn && (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
          <Nav>
            <LinkContainer to="/search">
              <Nav.Link>Search</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/wishlist">
              <Nav.Link><FaHeart /></Nav.Link>
            </LinkContainer>
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                <FaOpencart />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">{amount} Items</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Subtotal: ${total.toFixed(2)}</Dropdown.Item>
                <LinkContainer to="/cart">
                  <Dropdown.Item>View Cart</Dropdown.Item>
                </LinkContainer>
              </Dropdown.Menu>
            </Dropdown>
            {isLoggedIn ? (
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  Profile
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <LinkContainer to="/user-profile">
                    <Dropdown.Item>Profile</Dropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/order-history">
                    <Dropdown.Item>Order History</Dropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Dropdown.Item>Logout</Dropdown.Item>
                  </LinkContainer>
                </Dropdown.Menu>
              </Dropdown>
            ) : null}
          </Nav>
        </Container>
      </Navbar>

      {/* <Navbar className="border-bottom gray-800">
        <Container>
          <Nav className="mx-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/shop">
              <Nav.Link>Shop</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about-us">
              <Nav.Link>About Us</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>
            {!isLoggedIn && (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Container>
      </Navbar> */}
    </>
  );
};

export default CustomNavbar;
