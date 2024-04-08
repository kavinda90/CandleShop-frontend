import React, { useEffect } from "react";
import { Button, Container } from 'react-bootstrap';
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const SearchPagination = ({
  currentPage,
  setCurrentPage,
  products,
  handleSearchPagination,
  limit,
  totalPages,
}) => {
  useEffect(() => {
    handleSearchPagination();
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <Container className="d-flex justify-content-center mt-4">
      <Button
        variant="light"
        className="d-flex justify-content-center align-items-center me-2"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prevState) => prevState - 1)}
      >
        <FaArrowCircleLeft size="1.5em" />
      </Button>
      <span className="mx-2">Page {currentPage} of {totalPages}</span>
      <Button
        variant="light"
        className="d-flex justify-content-center align-items-center ms-2"
        disabled={products.length < limit}
        onClick={() => setCurrentPage((prevState) => prevState + 1)}
      >
        <FaArrowCircleRight size="1.5em" />
      </Button>
    </Container>
  );
};

export default SearchPagination;
