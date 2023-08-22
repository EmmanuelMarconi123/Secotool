import { Modal } from "rsuite";
import styles from "./NewCharacteristicModal.module.css";
import Select, { components } from "react-select";
import { useState } from "react";

const icons = [
  { value: "fa-solid fa-palette" },
  { value: "fa-solid fa-battery-bolt" },
  { value: "fa-solid fa-gear" },
  { value: "fa-solid fa-magnet" },
  { value: "fa-solid fa-toolbox" },
  { value: "fa-solid fa-scissors" },
  { value: "fa-solid fa-solid fa-user-helmet-safety" },
  { value: "fa-solid fa-wifi" },
  { value: "fa-solid fa-paint-roller" },
  { value: "fa-solid fa-microchip" },
];

const Option = (props) => (
  <components.Option {...props} className={styles.iconOption}>
    <i className={props.data.value} />
  </components.Option>
);

const NewCharacteristicModal = ({ handleClose, open }) => {
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);

  const handleChange = (value) => {
    setSelectedIcon(value);
  };

  const SingleValue = ({ ...props }) => (
    <components.SingleValue {...props}>
      <i
        className={selectedIcon.value}
        alt="s-logo"
        style={{ width: "100%" }}
      />
    </components.SingleValue>
  );

  return (
    <Modal size="md" open={open} onClose={handleClose} overflow={false} className={"rs-modal-wrapper"}>
      <Modal.Header>
        <Modal.Title style={{ textAlign: "center", fontSize: 23 }}>
          Nueva Característica
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <form className={styles.formNewCharacteristic} action="">
          <label htmlFor="">
            Nombre de la características
            <input type="text" />
          </label>

          <label htmlFor="" style={{ width: "30%" }}>
            Icono asociado
            <div style={{ width: "100%", textAlign:"center"}}>
              <Select
                value={selectedIcon}
                options={icons}
                onChange={handleChange}
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    height: "5vh",
                    borderRadius: "7px",
                    borderColor: "var(--darkGrey)"
                  }),
                  valueContainer: (baseStyles) => ({
                    ...baseStyles,
                    height: "5vh",
                    padding: "0",
                  }),
                  input:(baseStyles) => ({
                    ...baseStyles,
                    padding: "0",
                    margin: "0"
                  }),
                }}
                components={{
                  Option,
                  SingleValue,
                }}
              />
            </div>
          </label>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <div className={styles.buttonsContainer}>
          <button>Añadir</button>
          <button onClick={handleClose}>Cancelar</button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default NewCharacteristicModal;
