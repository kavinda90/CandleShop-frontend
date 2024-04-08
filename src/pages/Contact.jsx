import React from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { SectionTitle } from "../components";

const Contact = () => {
  return (
    <>
      <SectionTitle title="Contact Us" path="Home | Contact" />
      <Container className="mt-4 px-md-5">
        <Form className="mx-auto mt-5" style={{ maxWidth: '500px' }}>
          <Row className="g-3">
            <Col sm={6}>
              <Form.Group controlId="first-name">
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" autoComplete="given-name" />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId="last-name">
                <Form.Label>Last name</Form.Label>
                <Form.Control type="text" autoComplete="family-name" />
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group controlId="company">
                <Form.Label>Company</Form.Label>
                <Form.Control type="text" autoComplete="organization" />
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" autoComplete="email" />
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group controlId="phone-number">
                <Form.Label>Phone number</Form.Label>
                <Form.Control type="tel" autoComplete="tel" />
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={4} />
              </Form.Group>
            </Col>
            <Col sm={12} className="text-center">
              <Button type="submit" className="mt-2 w-100">Let's talk</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default Contact;
