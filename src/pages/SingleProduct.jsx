import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Badge, Form } from 'react-bootstrap';
import {
  QuantityInput,
  SectionTitle,
} from "../components";
import { FaHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";

import { Link, useLoaderData } from "react-router-dom";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import { store } from "../store";

export const singleProductLoader = async ({ params }) => {
  const { id } = params;

  const response = await axios(`${process.env.REACT_APP_API}/products/${id}`);

  return { productData: response.data };
};

const SingleProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [minimumQuantity, setMinimumQuantity] = useState(1);
  const { userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const [rating, setRating] = useState([
    "empty star",
    "empty star",
    "empty star",
    "empty star",
    "empty star",
  ]);

  const { productData } = useLoaderData();

  const product = {
    id: productData?._id + size,
    title: productData?.title,
    image: productData?.images[0].url,
    rating: productData?.rating,
    price: price,
    category: productData?.category,
    amount: quantity,
    selectedSize: size || productData?.bulkPricingOptions[0].size,
  };

  for (let i = 0; i < productData?.rating; i++) {
    rating[i] = "full star";
  }

  useEffect (() =>{
    optionSelected(0);
  }, [size]);

  useEffect (() =>{
    if(quantity < minimumQuantity) {
        setQuantity(minimumQuantity);
    }
    calcPrice();
  }, [quantity]);

  const optionSelected = (index) => {
    setSize(index);
    setPrice(productData.bulkPricingOptions[index].pricePerUnit);
    setQuantity(productData.bulkPricingOptions[index].minimumQuantity);
    setMinimumQuantity(productData.bulkPricingOptions[index].minimumQuantity);
    calcPrice();
  }

  const calcPrice = () => {
    let finalPrice = 0;
    finalPrice = productData?.bulkPricingOptions[size]?.pricePerUnit * quantity;
    setTotalPrice(finalPrice.toFixed(2));
  }

  return (
    <>
      <SectionTitle title="Product Page" path="Home | Shop | Product Page" />
      <Container className="my-3">
        <Row>
          <Col md={6}>
            {/* Product Image */}
            <img
              src={process.env.REACT_APP_PUBLIC_URL + `/img/${productData?.images[currentImage].url}`}
              alt={productData?.title}
              className="img-fluid"
            />
            {/* Additional Images */}
            <Row className="mt-1 g-2">
              {productData?.images.map((image, index) => (
                <Col xs={4} key={index} onClick={() => setCurrentImage(index)}>
                  <img src={process.env.REACT_APP_PUBLIC_URL + `/img/${image.url}`} alt={`Product ${index}`} className="img-fluid" />
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={6}>
            {/* Product Details */}
            <h2>{productData?.title}</h2>
            <p className="text-danger">${totalPrice}</p>
            <div>{parse(productData?.description)}</div>
            {/* Size Selector */}
            <div className="mt-4">
                <label htmlFor="Size" className="sr-only">
                    {" "}
                    Size{" "}
                </label>
                <Form.Select aria-label="Select Price" onChange={(e) => optionSelected(e.target.selectedIndex)}>
                {productData?.bulkPricingOptions.map((priceOption, index) => (
                    <option value={priceOption} key={index}>{priceOption.size} - ${priceOption.pricePerUnit}</option>
                ))}
                </Form.Select>
            </div>
            {/* Quantity Input and Action Buttons */}
            <div className="mt-4">
                <label htmlFor="Quantity" className="sr-only">
                    {" "}
                    Quantity{" "}
                </label>

                <div className="flex items-center gap-1">
                    <QuantityInput quantity={quantity} setQuantity={setQuantity} />
                </div>
            </div>
            <div className="d-flex align-items-center mt-3">
              {/* Quantity input and buttons here */}
            </div>
            <div className="mt-3">
              <Button variant="primary" className="me-2"
                onClick={() => {
                    if (loginState) {
                    dispatch(addToCart(product));
                    } else {
                    toast.error(
                        "You must be logged in to add products to the cart"
                    );
                    }
                }}>
                <FaCartShopping /> Add to Cart
              </Button>
            </div>
            <div className="other-product-info d-flex flex-column gap-2">
                <Badge bg="secondary" className="d-block p-2 mt-2 fs-6" text="light">
                    Category: {productData?.category}
                </Badge>
                <Badge bg="secondary" className="d-block p-2 mt-2 fs-6" text="light">
                    Scent: {productData?.scent}
                </Badge>
                <Badge bg="secondary" className="d-block p-2 mt-2 fs-6" text="light">
                    Color: {productData?.color}
                </Badge>
                <Badge bg="secondary" className="d-block p-2 mt-2 fs-6" text="light">
                    Size: {productData?.size}
                </Badge>
                <Badge bg="secondary" className="d-block p-2 mt-2 fs-6" text="light">
                    Burn Time: {productData?.burnTime}
                </Badge>
                <Badge bg="secondary" className="d-block p-2 mt-2 fs-6" text="light">
                    In Stock: {productData?.stock > 0 ? "Yes" : "No"}
                </Badge>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SingleProduct;
