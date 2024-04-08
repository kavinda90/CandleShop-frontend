import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { CartItemsList, CartTotals, SectionTitle } from '../components'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Cart = () => {
  
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const { cartItems } = useSelector((state) => state.cart);

  const isCartEmpty = () => {
    if(cartItems.length === 0){
      toast.error("Your cart is empty");
    }else{
      navigate("/thank-you");
    }
  }

  return (
    <>
        <SectionTitle title="Cart" path="Home | Cart" />
        <div className="mt-3">
            <Container fluid="lg" className="px-3">
                <Row className="g-4">
                <Col lg={8}>
                    <CartItemsList />
                </Col>
                <Col lg={4} className="pl-lg-4">
                    <CartTotals />
                    {loginState ? (
                    <Button onClick={isCartEmpty} variant="primary" className="mt-3 w-100">
                        Order now
                    </Button>
                    ) : (
                    <Link to="/login" className="btn btn-primary mt-3 w-100">
                        Please login
                    </Link>
                    )}
                </Col>
                </Row>
            </Container>
        </div>
    </>
  )
}

export default Cart