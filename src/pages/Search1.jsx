import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { ProductElement, SearchPagination, SectionTitle } from "../components";

const Search = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setCurrentPage(1); // Directly set to 1 without prevState, as prevState isn't necessary here
    setSearchTerm(e.target.elements.search.value); // Direct access to named form elements
    try {
    //   const response = await axios(
    //     `http://localhost:8080/products?q=${e.target.elements.search.value}&_page=${currentPage}`
    //   );
        const response = await axios(
            `http://localhost:9000/products`
        );
      setProducts(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSearchPagination = async () => {
    try {
    //   const response = await axios(
    //     `http://localhost:8080/products?q=${searchTerm}&_page=${currentPage}`
    //   );
        const response = await axios(
            `http://localhost:9000/products`
        );
      setProducts(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <SectionTitle title="Search" path="Home | Search" />
      <Container className="py-5">
        <Form onSubmit={handleSearch}>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search here…"
              name="search"
              aria-describedby="basic-addon2"
            />
            <Button variant="outline-secondary" type="submit" id="button-addon2">
              Search
            </Button>
          </InputGroup>
        </Form>

        {searchTerm && products.length !== 0 && (
          <h2 className="text-center my-3">
            Showing results for "{searchTerm}"
          </h2>
        )}
        {products.length === 0 && searchTerm && (
          <h2 className="text-center my-3">No results found for "{searchTerm}"</h2>
        )}
        <Row className="g-4">
          {products.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductElement
                id={product.id}
                title={product.name}
                image={product.imageUrl}
                rating={product.rating}
                price={product.price.current.value}
                brandName={product.brandName}
              />
            </Col>
          ))}
        </Row>
        <SearchPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          products={products}
          handleSearchPagination={handleSearchPagination}
        />
      </Container>
    </>
  );
};

export default Search;
