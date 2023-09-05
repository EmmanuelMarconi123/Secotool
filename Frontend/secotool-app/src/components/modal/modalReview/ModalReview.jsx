import { useState } from "react";
import { Modal, Button, Form, Rate, Input } from "rsuite";
import styles from "./ModalReview.module.css";

const initFormValue = {
  rate: 0,
};

const ModalReview = ({ open, size, handleClose }) => {
  const [formValue, setFormValue] = useState(initFormValue);

  return (
    <Modal
      size={size}
      open={open}
      onClose={handleClose}
      className={styles.modalReview}
    >
      <Modal.Header>
        <Modal.Title className={styles.mrTitle}>
          ¡Gracias por tu alquiler!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.mrBody}>
        <h4 className={styles.mrSubtitle}>¿Qué te pareció el producto?</h4>
        <Form formValue={formValue}>
          <Input
            as="textarea"
            rows={3}
            placeholder="Escribe aquí una breve reseña acerca de lo que opinas del producto"
          />
          <div>
            <h4 className={styles.mrSubtitle}>Califíca el producto</h4>
            <Form.Group controlId="rate">
              <Form.Control name="rate" accepter={Rate} size="lg" />
            </Form.Group>
          </div>
          <div>
            <Button onClick={handleClose} appearance="primary">
              Calificar
            </Button>
            <Button onClick={handleClose} appearance="subtle">
              Omitir
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
export default ModalReview;
