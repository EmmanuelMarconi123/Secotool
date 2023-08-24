import { Modal, TagPicker, Uploader } from "rsuite";
import styles from "./FormNewProduct.module.css";

function FormEditProduct({
  openEp,
  handleCloseEp,
  editedProduct,
  handleFieldChange,
  categories,
  features,
  handleUpdateProduct,
}) {

  return(

  <Modal size="md" open={openEp} onClose={handleCloseEp} overflow={false}>
    <Modal.Header>
      <Modal.Title style={{ textAlign: "center", fontSize: 23 }}>
        Editor de productos
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className={styles.containerModal}>
      <div className={styles.centeredForm}>
        <form className={styles.formNewProduct} action="">
          <label htmlFor="editProductName">
            Nombre del producto
            <input
              type="text"
              value={editedProduct.name}
              onChange={(event) =>
                handleFieldChange("name", event.target.value)
              }
            />
          </label>
          <label htmlFor="editDescription">
            Descripcion
            <textarea
              cols="30"
              rows="10"
              value={editedProduct.description}
              onChange={(event) =>
                handleFieldChange("description", event.target.value)
              }
              style={{ height: 120, width: 640 }}
            ></textarea>
          </label>
          <label htmlFor="">
            Categorias
            <TagPicker
              style={{ width: 640 }}
              data={categories}
              placeholder="Seleccionar categoria"
            />
          </label>
          <label htmlFor="">
            Caracteristicas
            <TagPicker
              style={{ width: 640 }}
              data={features}
              placeholder="Seleccionar caracteristica"
            />
          </label>
          <label htmlFor="">
            Precio
            <input
              type="number"
              value={editedProduct.price}
              onChange={(event) =>
                handleFieldChange("price", event.target.value)
              }
            />
          </label>
          <label htmlFor="">
            Imagenes
            <Uploader autoUpload={false} disabled draggable>
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
          <div className={styles.labelSeparator}></div>
          <button
            onClick={(event) => {
              event.preventDefault();
              handleUpdateProduct();
            }}
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </Modal.Body>
  </Modal>
  )
}

export default FormEditProduct;
