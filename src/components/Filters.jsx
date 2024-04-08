import React, { useState } from "react";
import FormInput from "./FormInput";
import { Button, Row, Col } from 'react-bootstrap';
import { Form, Link } from "react-router-dom";
import FormRange from "./FormRange";
import FormSelect from "./FormSelect";
import FormDatePicker from "./FormDatePicker";
import FormCheckbox from "./FormCheckbox";

const Filters = () => {
  const [selectCategoryList, setSelectCategoryList] = useState([
    "all",
    "Aromatherapy",
    "Fruit",
    "Nature",
    "Classic",
    "Fresh",
    "Spice",
    "Mint",
    "Floral",
    "Holiday"
  ]);
  const [selectScentList, setSelectScentList] = useState([
    "all",
    "Lavender",
    "Citrus",
    "Sea Salt",
    "Vanilla",
    "Pine",
    "Ocean",
    "Cinnamon",
    "Peppermint",
    "Jasmine",
    "Gingerbread"
  ]);
  const [selectSizeList, setSelectSizeList] = useState([
    "all",
    "Small",
    "Medium",
    "Large"
  ]);
  const [selectColorList, setSelectColorList] = useState([
    "all",
    "Purple",
    "Blue",
    "Cream",
    "Orange",
    "Grean",
    "Red",
    "White",
    "Brown"
  ]);

  return (
    <Form className="bg-light rounded-md p-3">
      <Row className="g-3">
        {/* SEARCH */}
        <Col sm={6} md={4} lg={3}>
          <FormInput
            type="search"
            label="Search product"
            name="search"
            defaultValue=""
          />
        </Col>
        {/* CATEGORIES */}
        <Col sm={6} md={4} lg={3}>
          <FormSelect
            label="Select category"
            name="category"
            list={selectCategoryList}
            defaultValue="all"
          />
        </Col>
        {/* Scent */}
        <Col sm={6} md={4} lg={3}>
          <FormSelect
            label="Select scent"
            name="scent"
            list={selectScentList}
            defaultValue="all"
          />
        </Col>
        {/* ORDER */}
        <Col sm={6} md={4} lg={3}>
          <FormSelect
            label="Sort by"
            name="order"
            list={["asc", "desc", "price high", "price low"]}
            defaultValue="a-z"
          />
        </Col>
        {/* Size */}
        <Col sm={6} md={4} lg={3}>
          <FormSelect
            label="Select size"
            name="size"
            list={selectSizeList}
            defaultValue="all"
          />
        </Col>
        {/* Color */}
        <Col sm={6} md={4} lg={3}>
          <FormSelect
            label="Select color"
            name="color"
            list={selectColorList}
            defaultValue="all"
          />
        </Col>
        {/* PRICE */}
        <Col sm={6} md={4} lg={3}>
          <FormRange
            name="price"
            label="Select price"
            defaultValue={10} // Assuming you adapt FormRange to accept a defaultValue or similar prop
          />
        </Col>
        {/* IN STOCK */}
        <Col sm={6} md={4} lg={3}>
            <FormCheckbox
                label="Only products in stock"
                name="stock"
                defaultValue="false"
            />
          
        </Col>
        {/* BUTTONS */}
        <Col sm={6} md={4} lg={3} className="d-grid">
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Col>
        <Col sm={6} md={4} lg={3} className="d-grid">
          <Link to="/shop?page=1" className="btn btn-secondary">
            Reset
          </Link>
        </Col>
      </Row>
    </Form>
  );
};

export default Filters;
