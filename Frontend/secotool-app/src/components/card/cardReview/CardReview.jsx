import { useState } from "react";
import styles from "./CardReview.module.css";
import { Rate, Form } from "rsuite";

const initFormValue = {
  rate: 5,
};

const CardReview = () => {
  const [formValue, setFormValue] = useState(initFormValue);
  const [status, setStatus] = useState("readonly");
  const readOnly = status === "readonly";

  return (
    <div className={styles.cardReview}>
      <h4>Evelyn Tramontin</h4>
      <span>16/08/2023</span>
      <Form
        readOnly={readOnly}
        formValue={formValue}
        className={styles.formVal}
      >
        <Form.Group controlId="rate" className={styles.formRate}>
          <Form.Control name="rate" accepter={Rate} size="xs" />
        </Form.Group>
      </Form>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Est ultricies
        integer quis auctor elit sed vulputate
      </p>
    </div>
  );
};
export default CardReview;
