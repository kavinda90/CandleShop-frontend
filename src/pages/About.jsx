import React from "react";
import { Container, Button } from 'react-bootstrap';
import { SectionTitle } from "../components";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <SectionTitle title="About Us" path="Home | About" />
      <Container className="text-center mt-5" style={{ maxWidth: '768px' }}>
        <h2 className="display-4 mb-4">We love our customers!</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          obcaecati eum est commodi, quam, ut quidem deleniti quos quod temporibus
          dicta deserunt voluptates ab! Deleniti id repellat, labore fugiat
          obcaecati dolorem minima fugit quasi nam velit reiciendis delectus ea
          tempora.
        </p>
        <Link to="/contact" className="mt-3 d-inline-block">
          <Button variant="primary">Contact Us</Button>
        </Link>
      </Container>
    </div>
  );
};

export default About;
