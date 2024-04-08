import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "../styles/Stats.css"; // Adjust if you still need custom styles

const Stats = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center text-center">
        <Col xs={12} md={6} lg={3} className="mb-4">
          <h3 className="display-4 font-weight-extrabold">10+</h3>
          <p className="font-medium">Years On The Market</p>
        </Col>

        <Col xs={12} md={6} lg={3} className="mb-4">
          <h3 className="display-4 font-weight-extrabold">$12m</h3>
          <p className="font-medium">Annual Revenue Growth</p>
        </Col>

        <Col xs={12} md={6} lg={3} className="mb-4">
          <h3 className="display-4 font-weight-extrabold">2600k+</h3>
          <p className="font-medium">Global Partners</p>
        </Col>

        <Col xs={12} md={6} lg={3} className="mb-4">
          <h3 className="display-4 font-weight-extrabold">180000+</h3>
          <p className="font-medium">Daily Website Visitors</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Stats;
