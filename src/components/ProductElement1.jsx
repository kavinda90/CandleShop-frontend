import React from "react";
import { useDispatch } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap';
import { Card, Button } from "react-bootstrap";
import { addToCart } from "../features/cart/cartSlice";
import '../styles/ProductElement.css'

const ProductElement = ({ id, title, image, rating, price, brandName }) => {
  const dispatch = useDispatch();
  const product = {
    id, title, image, rating, price, brandName, amount: 1
  };

  return (
    <Card className="shadow-sm rounded bg-light mb-4" style={{ width: '18rem' }}>
      <LinkContainer to={`/shop/product/${id}`} style={{ cursor: 'pointer' }}>
        <Card.Img variant="top" src={`https://${image}`} alt="product image" style={{ padding: '1rem' }} onClick={() => window.scrollTo(0, 0)} />
      </LinkContainer>
      <Card.Body>
        <LinkContainer to={`/shop/product/${id}`} style={{ cursor: 'pointer' }}>
          <Card.Title onClick={() => window.scrollTo(0, 0)} className="mb-4 two-line-clamp" style={{ fontWeight: '500', fontSize: '1.25rem' }}>{title}</Card.Title>
        </LinkContainer>
        <Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <span className="font-weight-bold" style={{ fontSize: '1.5rem' }}>${price}</span>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductElement;
