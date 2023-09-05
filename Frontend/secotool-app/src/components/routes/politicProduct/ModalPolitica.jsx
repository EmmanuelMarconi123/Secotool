import { Modal, Uploader } from "rsuite";
import styles from "./ModalPolitica.module.css"
import axios from "axios";
import { useState } from "react";

function ModalPolitica({
  open,
  handleClose,
  handleNewProductSubmit,
  getData,
}) {
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [uploadedImages, setUploadedImages] = useState([]); // Estado para las imágenes cargadas
  const handleImageChangeD = (fileList) => {
    setUploadedImages([...uploadedImages, ...fileList]);
  };

  const handleSubmit = () => {
    addCategoryAdmin();
    handleClose();
  };

  const addCategoryAdmin = async () => {


    const nuevaCategoria = {
      name: newCategory.name,
      description: newCategory.description,
    }
    const formData = new FormData();
    console.log(nuevaCategoria)

    const json = JSON.stringify(nuevaCategoria)
    console.log(json)
    const blob = new Blob([json],{
      type: 'application/json'
    })

    formData.append("data", blob)
    uploadedImages.forEach((file) => {
      formData.append("image", file.blobFile);
    });

    console.log(formData);

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
                onChange={handleImageChangeD}
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

export default ModalPolitica;
