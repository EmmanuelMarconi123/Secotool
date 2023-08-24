import { Modal, TagPicker, Uploader } from "rsuite";
import styles from "./FormNewProduct.module.css";
import { useEffect, useState } from "react";

function FormEditProduct({
  openEp,
  handleCloseEp,
  selectedProduct,
  onProductUpdate,
}) {
  useEffect(() => {
    setEditedName(selectedProduct.name);
    setEditedDescription(selectedProduct.description);
    setEditedPrice(selectedProduct.price);
  }, [selectedProduct]);
  //---------------------------------DATOS------------------------------>
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [editedName, setEditedName] = useState(selectedProduct.name);
  const [editedDescription, setEditedDescription] = useState(
    selectedProduct.description
  );
  const [editedPrice, setEditedPrice] = useState(selectedProduct.price);

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
        const response = await fetch(
          "http://localhost:8080/v1/api/products/features"
        );
        if (response.ok) {
          const data = await response.json();
          const transformedData = data.map((category) => ({
            label: category.name,
            value: category.id,
          }));
          setFeatures(transformedData);
        } else {
          console.error("Error fetching features:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    }

    fetchFeatures();
  }, []);

  //-------------------------------------------EDITAR---------------------->
  const [idsCategories, setIdsCategories] = useState(); //Agarra las categorias
  const [idsFeatures, setIdsFeatures] = useState([]);

  const handleOptionChange = (newSelectedOptions) => {
    console.log(newSelectedOptions);
    setIdsCategories(newSelectedOptions);
    console.log(idsCategories);
  };

  const handleOptionChangeF = (newSelectedOptionsF) => {
    console.log(newSelectedOptionsF);
    setIdsFeatures(newSelectedOptionsF);
    console.log(idsFeatures);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const updatedProduct = {
      name: editedName,
      description: editedDescription,
      price: editedPrice,
    };

    const categoriasId = {
      idsCategories: idsCategories,
    };

    const featuresId = {
      idsFeatures: idsFeatures,
    };

    formData.append(
      "product-data",
      new Blob([JSON.stringify(updatedProduct)], { type: "application/json" })
    );
    formData.append(
      "categories",
      new Blob([JSON.stringify(categoriasId)], { type: "application/json" })
    );
    formData.append(
      "features",
      new Blob([JSON.stringify(featuresId)], { type: "application/json" })
    );

    try {
      const response = await fetch(
        `http://localhost:8080/v1/api/products/${selectedProduct.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("El producto se actualizo correctamente");
        // El producto se actualizó correctamente
        handleCloseEp(); // Cerrar el modal después de la actualización
        const updatedProductR = {
          ...selectedProduct,
          name: editedName,
          description: editedDescription,
          price: editedPrice,
        };
        onProductUpdate(updatedProductR); // Llamar a la función de actualización del padre
      } else {
        console.error("Error updating product:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <Modal size="md" open={openEp} onClose={handleCloseEp} overflow={false}>
      <Modal.Header>
        <Modal.Title style={{ textAlign: "center", fontSize: 23 }}>
          Editor de productos
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.containerModal}>
        <div className={styles.centeredForm}>
          <form
            className={styles.formNewProduct}
            onSubmit={handleUpdateProduct}
            action=""
          >
            <label htmlFor="editProductName">
              Nombre del producto
              <input
                type="text"
                value={editedName}
                onChange={(event) => setEditedName(event.target.value)}
              />
            </label>
            <label htmlFor="editDescription">
              Descripcion
              <textarea
                cols="30"
                rows="10"
                value={editedDescription}
                onChange={(event) => setEditedDescription(event.target.value)}
                style={{ height: 120, width: 640, padding: 8 }}
              ></textarea>
            </label>
            <label htmlFor="">
              Categorias
              <TagPicker
                style={{ width: 640 }}
                data={categories}
                onChange={handleOptionChange}
                placeholder="Seleccionar categoria"
              />
            </label>
            <label htmlFor="">
              Caracteristicas
              <TagPicker
                style={{ width: 640 }}
                data={features}
                onChange={handleOptionChangeF}
                placeholder="Seleccionar caracteristica"
              />
            </label>
            <label htmlFor="">
              Precio
              <input
                type="number"
                value={editedPrice}
                onChange={(event) => setEditedPrice(event.target.value)}
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
            <button>Guardar Cambios</button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default FormEditProduct;
