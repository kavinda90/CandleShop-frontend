import { Form } from 'react-bootstrap';

const FormSelect = ({ label, name, list, defaultValue, size }) => {
    return (
      <Form.Group controlId={name}>
      <Form.Label htmlFor={name} className="text-capitalize">{label}</Form.Label>
      <Form.Control as="select" name={name} defaultValue={defaultValue}>
        {list.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
    );
  };
  export default FormSelect;
  