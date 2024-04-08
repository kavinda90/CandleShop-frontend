import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { ProductElement, SearchPagination, SectionTitle } from "../components";

const Search = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(8); // Number of items per page

  useEffect(() => {
    handleSearchPagination();
    window.scrollTo(0, 0);
  }, [searchTerm]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setCurrentPage(1); // Directly set to 1 without prevState, as prevState isn't necessary here
    console.log('search termmm', e.target.elements.search.value);
    setSearchTerm(e.target.elements.search.value);
  };

  const handleSearchPagination = async () => {
    try {
      const response = await axios(
        `${process.env.REACT_APP_API}/product-search?q=${searchTerm}&_page=${currentPage}&_limit=${limit}`
      );
      setProducts(response.data.data); // Assuming the backend sends an object with a 'data' property holding the array of products
      // Optionally, handle totalItems for pagination controls (e.g., displaying page numbers)
      setTotalItems(response.data.totalItems);
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
            <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
              <ProductElement
                key={product._id}
                id={product._id}
                title={product.title}
                image={product.images[0].url}
                rating={product.rating}
                price={product.bulkPricingOptions[0].pricePerUnit}
              />
            </Col>
          ))}
        </Row>
        <SearchPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          products={products}
          handleSearchPagination={handleSearchPagination}
          limit={limit}
          totalPages={Math.ceil(totalItems/limit)}
        />
      </Container>
    </>
  );
};

export default Search;
