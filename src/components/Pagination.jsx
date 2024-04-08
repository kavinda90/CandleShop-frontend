import React, { useState } from "react";
import { Button, Container } from 'react-bootstrap';
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const Pagination = () => {
  const productsLoaderData = useLoaderData();

  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="d-inline-flex align-items-center">
        <Button
          variant="primary"
          className="me-2 d-flex justify-content-center align-items-center"
          style={{ fontSize: '1.5rem' }} // Adjusting to match the original size
          onClick={() => {
            if (productsLoaderData.page === 1) {
              return;
            }
            handlePageChange(productsLoaderData.page - 1);
            window.scrollTo(0, 0);
          }}
          disabled={productsLoaderData.page === 1} // Disable button if on first page
        >
          <FaArrowCircleLeft />
        </Button>
        <Button variant="secondary" className="text-xl" disabled>
          Page {productsLoaderData.page}
        </Button>
        <Button
          variant="primary"
          className="ms-2 d-flex justify-content-center align-items-center"
          style={{ fontSize: '1.5rem' }} // Adjusting to match the original size
          onClick={() => {
            if (productsLoaderData.productsLength < 8) {
              return;
            }
            handlePageChange(productsLoaderData.page + 1);
            window.scrollTo(0, 0);
          }}
          disabled={productsLoaderData.productsLength < 8} // Disable button if less than 10 products
        >
          <FaArrowCircleRight />
        </Button>
      </div>
    </div>

  );
};

export default Pagination;
