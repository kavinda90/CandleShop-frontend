import React from "react";
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { FaTwitterSquare, FaFacebookSquare, FaInstagramSquare, FaYoutubeSquare } from "react-icons/fa";

const Footer = () => {
  const loginState = useSelector((state) => state.auth.isLoggedIn);

  return (
    <footer className="pt-5 pb-5 mt-5 bg-light text-dark rounded">
      <Container>
        <Row className="text-center mb-4">
          <Nav className="justify-content-center mx-auto">
            <LinkContainer to="/">
              <Nav.Link className="text-decoration-none text-dark">Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/shop">
              <Nav.Link className="text-decoration-none text-dark">Shop</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link className="text-decoration-none text-dark">About Us</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link className="text-decoration-none text-dark">Contact</Nav.Link>
            </LinkContainer>
            {!loginState && (
              <>
                <LinkContainer to="/login">
                  <Nav.Link className="text-decoration-none text-dark">Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link className="text-decoration-none text-dark">Register</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Row>
        <Row className="justify-content-center mb-4">
          <Col xs="auto">
            <FaTwitterSquare className="mx-2 text-dark" size="2em" />
            <FaFacebookSquare className="mx-2 text-dark" size="2em" />
            <FaInstagramSquare className="mx-2 text-dark" size="2em" />
            <FaYoutubeSquare className="mx-2 text-dark" size="2em" />
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p className="text-dark">
              Copyright © 2023 - All rights reserved by Eternal Flame
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
