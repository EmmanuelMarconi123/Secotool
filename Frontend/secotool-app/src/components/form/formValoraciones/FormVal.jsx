import { useState } from "react";
import { Rate, Form } from "rsuite";
import styles from "./FormVal.module.css";

const initFormValue = {
  rate: 2,
};

const FormVal = () => {

  const [formValue, setFormValue] = useState(initFormValue);
  const [status, setStatus] = useState("readonly");
  const readOnly = status === "readonly";

  return (
    <Form readOnly={readOnly} formValue={formValue} className={styles.formVal}>
      <h2 className={styles.valTitle}>5.0</h2>
      <Form.Group controlId="rate" className={styles.formRate}>
        <Form.Control name="rate" accepter={Rate} size="xs" />
      </Form.Group>
      <span>2 valoraciones</span>
    </Form>
  );
};
export default FormVal;
