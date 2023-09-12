import { Button, Modal, TagPicker, Uploader } from "rsuite";
import styles from "./formNewProduct/FormNewProduct.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useGlobal } from "../../contexts/GlobalContext";

function FormEditProduct({
  openEp,
  handleCloseEp,
  selectedProduct,
  onProductUpdate,
}) {
  const { token } = useAuth();
  const { globalVariable } = useGlobal();

  //------------------------------INPUTS EDIT-------------------------------->
  const [editedName, setEditedName] = useState();
  const [editedDescription, setEditedDescription] = useState();
  const [editedPrice, setEditedPrice] = useState();
  const [editedCategories, setEditedCategories] = useState([]);
  const [editedFeatures, setEditedFeatures] = useState([]);

  useEffect(() => {
    if (selectedProduct) {
      setEditedName(selectedProduct.name);
      setEditedDescription(selectedProduct.description);
      setEditedPrice(selectedProduct.price);
      
      if (selectedProduct.productCategories) {
        const categoryIds = selectedProduct.productCategories.map((category) => category.id);
        setEditedCategories(categoryIds || []);
      } else {
        setEditedCategories([]); // Si productCategories no está definido, asigna un array vacío
      }
  
      if (selectedProduct.productFeatures) {
        const featureIds = selectedProduct.productFeatures.map((feature) => feature.id);
        setEditedFeatures(featureIds || []);
      } else {
        setEditedFeatures([]); // Si productFeatures no está definido, asigna un array vacío
      }
    }
  }, [selectedProduct]);
  //---------------------------------DATOS------------------------------>
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);


  

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          `${globalVariable}/v1/api/categories/open`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
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
          `${globalVariable}/v1/api/features/open`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
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
  const[isLoading, setIsLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]); // Estado para las imágenes cargadas

  const handleImageChangeE = (fileList) => {
    setUploadedImages(fileList);
    console.log(fileList)
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const formData = new FormData();
    const updatedProduct = {
      name: editedName,
      description: editedDescription,
      price: editedPrice,
    };

    const categoriasId = {
      idsCategories: editedCategories,
    };

    const featuresId = {
      idsFeatures: editedFeatures,
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

    uploadedImages.forEach((file) => {
      formData.append("images", file.blobFile);
    });

    try {
      const response = await fetch(
        `${globalVariable}/v1/api/products/admin/${selectedProduct.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
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
        setIsLoading(false)
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
                data={categories || []}
                value={editedCategories}
                placeholder="Seleccionar categoria"
                onChange={(selectedCategoryIds) => setEditedCategories([...selectedCategoryIds])}
              />
            </label>
            <label htmlFor="">
              Caracteristicas
              <TagPicker
                style={{ width: 640 }}
                value={editedFeatures}
                data={features}
                placeholder="Seleccionar caracteristica"
                onChange={(selectedFeatureIds) => setEditedFeatures([...selectedFeatureIds])}
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
              <Uploader listType="picture-text" autoUpload={false} draggable onChange={handleImageChangeE}>
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
            <Button type='submit' appearance="default" loading={isLoading} disabled={isLoading}>
            {isLoading ? "Cargando..." : "Guardar cambios"}
            </Button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default FormEditProduct;
