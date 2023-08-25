import { Modal, Uploader } from "rsuite";
import styles from "./NewCategoryModal.module.css";
import axios from "axios";
import { useState } from "react";

function NewCategoryModal({
  open,
  handleClose,
  handleNewProductSubmit,
  getData,
}) {
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [newImage, setNewImage] = useState("");

  const handleSubmit = () => {
    addCategoryAdmin();
    handleClose();
  };

  const handleChangeImage = (file) => {
    setNewImage(file);
  };

  const addCategoryAdmin = async () => {
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(newCategory)], { type: "application/json" })
    );
    formData.append("image", newImage.blobFile);

    console.log(newImage);

    axios({
      method: "post",
      url: "http://localhost:8080/v1/api/categories",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        handleClose();
        console.log(response);
        getData();
      })
      .catch(function (response) {
        console.log(response);
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
          Nueva categoría
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.containerModal}>
        <div className={styles.centeredForm}>
          <form
            className={styles.formNewProduct}
            onSubmit={handleNewProductSubmit}
          >
            <label htmlFor="">
              Nombre de la categoría
              <input
                type="text"
                name="name"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
            </label>
            <label htmlFor="">
              Descripción
              <textarea
                cols="30"
                rows="10"
                name="description"
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
                style={{ height: 120, width: 640, padding: 8 }}
              ></textarea>
            </label>
            <label htmlFor="">
              Imagenes
              <Uploader
                autoUpload={false}
                draggable
                onChange={handleChangeImage}
              >
                <div
                  style={{
                    height: 54,
                    width: 640,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    borderRadius: 8,
                    border: "1px dashed #666",
                  }}
                >
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                  <span>Subir imagen</span>
                </div>
              </Uploader>
            </label>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className={styles.buttonsContainer}>
          <button onClick={() => handleSubmit()}>Añadir</button>
          <button onClick={handleClose}>Cancelar</button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default NewCategoryModal;
