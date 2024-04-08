import { Form } from 'react-bootstrap';

const FormInput = ({ label, name, type, defaultValue, size }) => {
    return (
      <Form.Group className="mb-3">
      <Form.Label htmlFor={name} className="capitalize">{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder="Search here..."
      />
    </Form.Group>
    );
  };
  export default FormInput;