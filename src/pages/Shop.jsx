import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup} from 'react-bootstrap';
import {
  Filters,
  SearchPagination,
  ProductElement,
  SectionTitle,
  Pagination
} from "../components";
import "../styles/Shop.css";
import axios from "axios";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";

export const shopLoader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);


  const filterObj = {
    scent: params.scent ?? "all",
    category: params.category ?? "all",
    size: params.size ?? "all",
    color: params.color ?? "all",
    order: params.order ?? "asc",
    price: params.price ?? 2000,
    search: params.search ?? "",
    in_stock: params.stock === undefined ? false : true,
    current_page: Number(params.page) || 1
  };


  try {
    const response = await axios(
      `${process.env.REACT_APP_API}/products?${
        filterObj.scent === "all" ? "" : `scent=${params.scent}`
      }&${
        filterObj.category === "all" ? "" : `category=${params.category}`
      }&${
        filterObj.size === "all" ? "" : `size=${params.size}`
      }&${
        filterObj.color === "all" ? "" : `color=${params.color}`
      }&${
        filterObj.order === "asc" || filterObj.order === "desc"
          ? `_sort=name&_order=${filterObj.order}`
          : filterObj.order === "price low"
          ? `_sort=product.bulkPricingOptions[0].pricePerUnit&_order=asc`
          : `_sort=product.bulkPricingOptions[0].pricePerUnit&_order=desc`
      }&${filterObj.search && `q=${filterObj.search}`}&${
        filterObj.price && `product.bulkPricingOptions[0].pricePerUnit_lte=${filterObj.price}`
      }&${filterObj.in_stock === true && `isInStock=${filterObj.in_stock}`}&${`_page=${filterObj.current_page}&_limit=8`}`
    );
    const data = response.data;
    return {productsData: data, productsLength: data.length, page: filterObj.current_page};
  } catch (error) {
    console.log(error.response);
  }
  // /posts?views_gte=10

  return null;
};




const Shop = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [limit, setLimit] = useState(8); 

    const productLoaderData = useLoaderData();


    return (
        <>
            
            <SectionTitle title="Shop" path="Home | Shop" />
            <Container className="mt-3">
                <Filters />
                {productLoaderData.productsData.length === 0 && (
                <h2 className="text-center text-primary my-5" style={{ fontSize: '2.5rem' }}>
                    No products found for this filter
                </h2>
                )}
                <Row className="g-4">
                {productLoaderData.productsData.length !== 0 &&
                    productLoaderData.productsData.map((product) => (
                    <Col lg={3} md={4} sm={6} xs={12} key={product._id}>
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
                <Pagination />
            </Container>
        </>
    );
};

export default Shop;
