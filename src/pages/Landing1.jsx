import React, { useEffect } from "react";
import "../styles/Landing.css";
import { Hero, ProductElement, Stats } from "../components";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card } from 'react-bootstrap';

export const landingLoader = async () => {
    const response = await axios(
        `${process.env.REACT_APP_API}/products`
    );
    const data = response.data;

    return { products: data };
};

const Landing = () => {
  const { products } = useLoaderData();
  const navigate = useNavigate();

  return (
    <main>
      <Hero />
      <Stats />

      <Container className="my-5">
        <h2 className="text-center mb-4" style={{ fontSize: '2.5rem' }}>
          Trending Products
        </h2>
        <Row xs={1} md={2} lg={4} className="g-4">
          {products.slice(0, 8).map((product) => (
            <Col key={product._id}>
              <ProductElement
                id={product._id}
                title={product.title}
                image={product.images[0].url}
                rating={product.rating}
                price={product.bulkPricingOptions[0].pricePerUnit}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default Landing;
