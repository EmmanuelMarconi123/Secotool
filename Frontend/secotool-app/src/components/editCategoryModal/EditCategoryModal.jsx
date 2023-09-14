import { Message, Modal, toaster } from "rsuite";
import styles from "./EditCategoryModal.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useGlobal } from "../../contexts/GlobalContext";

function EditCategoryModal({ handleClose, open, getData, selectedCategory }) {
  const { token } = useAuth();
  const { globalVariable } = useGlobal();

  const [currentCategory, setCurrentCategory] = useState({
    name: "",
    description: "",
  });
  const [currentImage, setCurrentImage] = useState("");

  const handleSubmit = () => {
    editCategoryAdmin();
    handleClose();
  };

  const message = (
    <Message showIcon type="success" closable>
      La categoria se ha creado exitosamente
    </Message>
  );

  const editCategoryAdmin = async () => {

    axios({
      method: "put",
      url: `${globalVariable}/v1/api/categories/admin/${selectedCategory.id}`,
      data: currentCategory,
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    })
      .then(function (response) {
        handleClose();
        console.log(response);
        toaster.push(message, { placement: "bottomStart", duration: 5000 });
        getData();
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  useEffect(() => {
    setCurrentCategory({
      name: selectedCategory.name,
      description: selectedCategory.description,
    });
    setCurrentImage(selectedCategory.image);
  }, [selectedCategory]);

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
          Editar categoría
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.containerModal}>
        <div className={styles.centeredForm}>
          <form className={styles.formNewProduct}>
            <label htmlFor="">
              Nombre del producto
              <input
                type="text"
                name="name"
                value={currentCategory.name}
                onChange={(e) =>
                  setCurrentCategory({
                    ...currentCategory,
                    name: e.target.value,
                  })
                }
              />
            </label>
            <label htmlFor="">
              Descripción
              <textarea
                cols="30"
                rows="10"
                name="description"
                value={currentCategory.description}
                onChange={(e) =>
                  setCurrentCategory({
                    ...currentCategory,
                    description: e.target.value,
                  })
                }
                style={{ height: 120, width: 640, padding: 8 }}
              ></textarea>
            </label>
          </form>
        </div>
        {currentImage && (
          <div
            style={{
              height: 54,
              width: 640,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "none",
              overflow: "hidden",
            }}
          >
            <img
              style={{ width: "50%", borderRadius: 8 }}
              src={currentImage.url}
              alt=""
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              <a href={currentImage.url} target="blank">
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className={styles.buttonsContainer}>
          <button onClick={() => handleSubmit()}>Editar</button>
          <button onClick={handleClose}>Cancelar</button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default EditCategoryModal;
