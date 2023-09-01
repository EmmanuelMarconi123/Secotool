import { useState } from "react";
import { Modal, Button} from "rsuite";
import FormShareProduct from "../form/formShareProduct/FormShareProduct";

const ModalShare = () => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const handleOpen = (value) => {
    setSize(value);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button size="lg" onClick={() => handleOpen("lg")}>
      <i className="fa-regular fa-share-nodes"></i>
      </Button>

      <Modal size={size} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Compartir producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FormShareProduct></FormShareProduct>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ModalShare;
