import { Form } from 'react-bootstrap';

const FormCheckbox = ({ label, name, defaultValue, size }) => {
    return (
      <Form.Group controlId={name} className="d-flex align-items-center">
        <Form.Check
          type="checkbox"
          name={name}
          label={<span className="capitalize">{label}</span>}
          defaultChecked={false}
          className={`${size}`} // You may need to adjust this as Bootstrap doesn't directly support 'checkbox-primary' or size classes for checkboxes
        />
      </Form.Group>
    );
  };
  export default FormCheckbox;
  