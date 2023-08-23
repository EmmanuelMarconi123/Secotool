import { Modal } from "rsuite";
import styles from './EditFeatureModal.module.css'
import Select, { components } from "react-select";
import { useEffect, useState } from "react";

const icons = [
  { value: "fa-solid fa-wifi" },
  { value: "fa-solid fa-bullseye-arrow" },
  { value: "fa-solid fa-battery-bolt" },
  { value: "fa-solid fa-user-helmet-safety" },
  { value: "fa-solid fa-water-arrow-down" },
  { value: "fa-solid fa-circle-bolt" },
  { value: "fa-solid fa-shield-halved" },
];

const Option = (props) => (
  <components.Option {...props} className={styles.iconOption}>
    <i className={props.data.value} />
  </components.Option>
);

const EditFeatureModal = ({ handleClose, open, getData, selectedFeature }) => {
  const [selectedIcon, setSelectedIcon] = useState(icons[3]);
  const [newFeature, setNewFeature] = useState({});

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
  };

  const handleSubmit = () => {
    editFeaturesAdmin();
    handleClose();
  };

  const editFeaturesAdmin = async () => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeature),
    };

    try {
      const response = await fetch(`http://localhost:8080/v1/api/products/features/${selectedFeature.id}`,
        options
      );
      if (response.ok) {
        const data = await response.json();
        console.log("La característica se ha agregado correctamente", data); //Borrar este console.log, mas tarde\
      } else {
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      console.error(error);
      getData(); // LO PUSE TEMPORALMENTE ACA PORQUE ENTRA EN ERROR
    }
  };

  useEffect(()=>{
    console.log(selectedFeature)
    setNewFeature(selectedFeature);
    console.log(selectedFeature.id)
  },[selectedFeature])

  return (
    <Modal
      size="md"
      open={open}
      onClose={handleClose}
      overflow={false}
      className={"rs-modal-wrapper"}
    >
      <Modal.Header>
        <Modal.Title style={{ textAlign: "center", fontSize: 23 }}>
          Editar característica
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <form className={styles.formNewCharacteristic} action="">
          <label htmlFor="">
            Nombre de la características
            <input
              type="text"
              value={newFeature.name}
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
          <button onClick={() => handleSubmit()}>Editar</button>
          <button onClick={handleClose}>Cancelar</button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EditFeatureModal;
