import { Modal } from "rsuite";
import styles from "./NewFeatureModal.module.css";
import Select, { components } from "react-select";
import { useState } from "react";
import axios from "axios";

const icons = [
  { value: "fa-solid fa-wifi" },
  { value: "fa-solid fa-bullseye-arrow" },
  { value: "fa-solid fa-battery-bolt" },
  { value: "fa-solid fa-user-helmet-safety" },
  { value: "fa-solid fa-water-arrow-down" },
  { value: "fa-solid fa-circle-bolt" },
  { value: "fa-solid fa-shield-halved" },
  { value: "fa-solid fa-toolbox" },
  { value: "fa-solid fa-gear" },
  { value: "fa-solid fa-magnet" },
  { value: "fa-solid fa-screwdriver" },
  { value: "fa-solid fa-block-brick-fire" },
  { value: "fa-solid fa-helmet-safety" },
  { value: "fa-solid fa-stopwatch" },
];

const Option = (props) => (
  <components.Option {...props} className={styles.iconOption}>
    <i className={props.data.value} />
  </components.Option>
);

const NewFeatureModal = ({ handleClose, open, getData }) => {
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);
  const [newFeature, setNewFeature] = useState({ name: "", icon: icons[0] });

  const SingleValue = ({ ...props }) => (
    <components.SingleValue {...props}>
      <i
        className={selectedIcon.value}
        alt="s-logo"
        style={{ width: "100%" }}
      />
    </components.SingleValue>
  );

  const handleChange = (value) => {
    setSelectedIcon(value);
    setNewFeature({ ...newFeature, icon: value.value });
    console.log(newFeature);
  };

  const handleSubmit = () => {
    addFeaturesAdmin();
    handleClose();
  };

  const addFeaturesAdmin = async () => {
    axios
      .post("http://localhost:8080/v1/api/products/features", {
        name: newFeature.name,
        icon: newFeature.icon,
      })
      .then(function (response) {
        console.log(response);
        getData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Modal
      size="md"
      open={open}
      onClose={handleClose}
      overflow={false}
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
      dialogClassName={styles.dialogClassName}
    >
      <Modal.Header>
        <Modal.Title style={{ textAlign: "center", fontSize: 23 }}>
          Nueva Característica
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <form className={styles.formNewCharacteristic} action="">
          <label htmlFor="">
            Nombre de la características
            <input
              type="text"
              onChange={(e) =>
                setNewFeature({ ...newFeature, name: e.target.value })
              }
            />
          </label>

          <label htmlFor="" style={{ width: "30%" }}>
            Icono asociado
            <div style={{ width: "100%", textAlign: "center" }}>
              <Select
                value={selectedIcon}
                options={icons}
                onChange={handleChange}
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    height: "5vh",
                    borderRadius: "7px",
                    borderColor: "var(--darkGrey)",
                  }),
                  valueContainer: (baseStyles) => ({
                    ...baseStyles,
                    height: "5vh",
                    padding: "0",
                  }),
                  input: (baseStyles) => ({
                    ...baseStyles,
                    padding: "0",
                    margin: "0",
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
          <button onClick={() => handleSubmit()}>Añadir</button>
          <button onClick={handleClose}>Cancelar</button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default NewFeatureModal;