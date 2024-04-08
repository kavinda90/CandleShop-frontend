import { useDispatch } from "react-redux";
import { Col, Row, Image, Form, Button } from 'react-bootstrap';
import { removeItem, updateCartAmount } from "../features/cart/cartSlice";
import { useEffect } from "react";


const CartItem = ({ cartItem }) => {
  const { id, title, price, image, amount, category, selectedSize } =
    cartItem;

    const dispatch = useDispatch();

  return (
    <article key={id} className="mb-3 pb-3 border-bottom">
        <Row className="g-3 align-items-center">
            {/* IMAGE */}
            <Col xs={6} sm={3} md={3} lg={2} className="d-flex justify-content-center">
                <Image src={process.env.REACT_APP_PUBLIC_URL + `/img/${image}`} alt={title} rounded fluid style={{ height: '128px', width: '128px', objectFit: 'cover' }} />
            </Col>
            {/* INFO */}
            <Col xs={6} sm={9} md={5} lg={6}>
                <h3 className="text-capitalize">{title}</h3>
                <h4 className="mt-2 text-capitalize">
                    Category: {category}
                </h4>
                <h4 className="mt-2 text-capitalize">
                    Size: {selectedSize}
                </h4>
            </Col>
            <Col sm={12} md={4} lg={3} className="mt-3 mt-md-0">
            {/* AMOUNT */}
                <Form.Group controlId="amount">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control 
                        type="number" 
                        value={amount}
                        onChange={(event) => dispatch(updateCartAmount({id: id, amount: event.target.value}))}
                        size="sm"
                    />
                </Form.Group>
                {/* REMOVE */}
                <Button variant="warning" size="sm" onClick={() => dispatch(removeItem(id))} className="mt-2">
                    Remove
                </Button>
            </Col>
            {/* PRICE */}
            <Col className="mt-3 mt-md-0" sm={12} md={{ span: 3, offset: 9 }} lg={{ span: 1, offset: 0 }} xl={{ span: 1, offset: 10 }}>
                <p>${(price * amount).toFixed(2)}</p>
            </Col>
        </Row>
    </article>
  );
};

export default CartItem;
