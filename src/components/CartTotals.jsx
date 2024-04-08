import React from 'react'
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const CartTotals = () => {
  const { amount } = useSelector((state) => state.cart);
  const { total } = useSelector((state) => state.cart);
  const tax = total / 5;
  const shipping = 50;
  return (
    <div className="mb-3">
      <Card bg="light" className="shadow-sm">
        <Card.Body>
          {/* SUBTOTAL */}
          <div className="d-flex justify-content-between align-items-center mb-2" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem' }}>Subtotal</span>
            <span className="fw-medium">${(total).toFixed(2)}</span>
          </div>
          {/* SHIPPING */}
          <div className="d-flex justify-content-between align-items-center mb-2" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem' }}>Shipping</span>
            <span className="fw-medium">${shipping.toFixed(2)}</span>
          </div>
          {/* TAX */}
          <div className="d-flex justify-content-between align-items-center mb-2" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem' }}>Tax 20%</span>
            <span className="fw-medium">${(tax).toFixed(2)}</span>
          </div>
          {/* ORDER TOTAL */}
          <div className="d-flex justify-content-between align-items-center mt-3" style={{ paddingBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem' }}>Order Total</span>
            <span className="fw-medium">${(total + shipping + tax).toFixed(2)}</span>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default CartTotals