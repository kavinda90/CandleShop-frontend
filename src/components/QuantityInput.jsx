import React, { memo, useState } from "react";
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { FaMinus, FaPlus } from 'react-icons/fa';

const QuantityInput = ({ quantity, setQuantity }) => {
  return (
    <>
        <InputGroup className="mb-3">
            <Button
                variant="outline-secondary"
                onClick={() => {
                    if (quantity !== 1) {
                    setQuantity(quantity - 1);
                    }
                }}
            >
                <FaMinus />
            </Button>
            <FormControl
                type="text"
                value={quantity}
                readOnly
                style={{ textAlign: 'center' }} // Ensures the text is centered as Bootstrap's FormControl doesn't include text-centering by default
            />
            <Button
                variant="outline-secondary"
                onClick={() => setQuantity(quantity + 1)}
            >
                <FaPlus />
            </Button>
        </InputGroup>
    </>
  );
};

export default memo(QuantityInput);
