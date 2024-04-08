
import { useState } from 'react';
import { Form } from 'react-bootstrap';

const FormRange = ({ label, name, size, price }) => {
  const step = 10;
  const maxPrice = 40;
  const [selectedPrice, setSelectedPrice] = useState(price || maxPrice);

  return (
    <Form.Group>
      <Form.Label htmlFor={name} className="cursor-pointer d-block">
        <span className="text-capitalize">{label}</span>: ${selectedPrice}
      </Form.Label>
      <input
        type="range"
        id={name}
        name={name}
        min={0}
        max={maxPrice}
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
        step={step}
        style={{width:'100%'}}
      />
      <div className="w-100 d-flex justify-content-between text-xs px-2 mt-2">
        <span className="font-bold">$0</span>
        <span className="font-bold">Max: ${maxPrice}</span>
      </div>
    </Form.Group>
  );
};
export default FormRange;
