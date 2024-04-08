import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Container, Row, Col, Button } from 'react-bootstrap';
import "../styles/Hero.css";

const Hero = () => {
    return (
      <div className="hero bg-light text-center">
        <Container className="py-5 hero-content">
            <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <Col md={8} lg={6}>
                    <h1 className="display-4 font-weight-bold mb-4 text-white">Elevate Every Moment with Artisanal Candle Glow.</h1>
                    <p className="lead mb-4 text-white">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                        excepturi exercitationem quasi. In deleniti eaque aut repudiandae
                        et a id nisi.
                    </p>
                    <LinkContainer to="/shop">
                        <Button variant="primary" size="lg">Shop Now</Button>
                    </LinkContainer>
                </Col>
            </Row>
        </Container>
      </div>
    );
  };

export default Hero