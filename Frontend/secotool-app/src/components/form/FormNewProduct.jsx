import { Modal, TagPicker, Uploader } from "rsuite";
import styles from "./FormNewProduct.module.css";
import { useState, useEffect } from "react";

function FormNewProduct({
  open,
  handleClose,
  handleNewProductSubmit,
  name,
  setName,
  description,
  setDescription,
  setCategory,
  price,
  setPrice,
  handleImageChangeD,
}) {
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("http://localhost:8080/v1/api/categories");
        if (response.ok) {
          const dataC = await response.json();

          // Transforma los datos a la estructura de TagPicker
          const transformedData = dataC.map((category) => ({
            label: category.name,
            value: category.id,
          }));

          setCategories(transformedData);
        } else {
          console.error("Error fetching categories:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchFeatures() {
      try {
        const response = await fetch("http://localhost:8080/v1/api/products/features");
        if (response.ok) {
          const dataF = await response.json();

          // Transforma los datos a la estructura de TagPicker
          const transformedData = dataF.map((feature) => ({
            label: feature.name,
            value: feature.id,
          }));

          setFeatures(transformedData);
        } else {
          console.error("Error fetching categories:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchFeatures();
  }, []);
  /*Aqui va el formulario para agregar un nuevo producto como admin*/
  return (
    <Modal size="md" open={open} onClose={handleClose} overflow={false}>
      <Modal.Header>
        <Modal.Title style={{ textAlign: "center", fontSize: 23 }}>
          Nuevo Producto
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.containerModal}>
        <div className={styles.centeredForm}>
          <form
            className={styles.formNewProduct}
            onSubmit={handleNewProductSubmit}
          >
            <label htmlFor="">
              Nombre del producto
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label htmlFor="">
              Descripcion
              <textarea
                cols="30"
                rows="10"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ height: 120, width: 640, padding: 8 }}
              ></textarea>
            </label>
            <label htmlFor="">
              Categorias
              <TagPicker
                data={categories}
                style={{ width: 640 }}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Seleccionar categorias"
              />
            </label>
            <label htmlFor="">
              Caracteristicas
              <TagPicker
                style={{ width: 640 }}
                data={features}
                placeholder="Seleccionar caracteristicas"
              />
            </label>
            <label htmlFor="">
              Precio
              <input
                type="text"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
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
            <div className={styles.labelSeparator}></div>
            <button>Agregar Producto</button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default FormNewProduct;
