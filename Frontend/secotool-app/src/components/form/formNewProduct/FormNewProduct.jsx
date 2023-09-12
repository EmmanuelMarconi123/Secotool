import { Modal, TagPicker, Uploader, Button } from "rsuite";
import styles from "./FormNewProduct.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import { useGlobal } from "../../../contexts/GlobalContext";

function FormNewProduct({ open, handleClose, onProductCreated }) {
  //-----------------------------DATOS(CATEGORIAS Y FEATURES)----------------------------------->
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);

  const { token } = useAuth();
  const { globalVariable } = useGlobal();

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

  //--------------------------------NEW PRODUCT---------------------->
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]); // Estado para las imágenes cargadas

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

  const handleImageChangeD = (fileList) => {
    setUploadedImages(fileList);
    console.log(fileList);
  };

  const handleNewProductSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(); //Creando el form DATA

    const productData = {
      name: name,
      description: description,
      price: price,
    };

    const categoriasId = {
      idsCategories: idsCategories,
    };

    const featuresId = {
      idsFeatures: idsFeatures,
    };
    formData.append(
      "product-data",
      new Blob([JSON.stringify(productData)], { type: "application/json" })
    );
    formData.append(
      "categories",
      new Blob([JSON.stringify(categoriasId)], { type: "application/json" })
    );
    formData.append(
      "features",
      new Blob([JSON.stringify(featuresId)], { type: "application/json" })
    );
    //-----------------------APPENDS------------------>
    uploadedImages.forEach((file) => {
      formData.append("images", file.blobFile);
    });

    console.log(formData);

    axios({
      method: "post",
      url: `${globalVariable}/v1/api/products/admin`,
      data: formData,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        handleClose();
        onProductCreated();
        setIsLoading(false);

        setName("");
        setDescription("");
        setPrice("");
        setUploadedImages([]);
        setIdsCategories([]);
        setIdsFeatures([]);
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

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
                value={idsCategories}
                onChange={handleOptionChange}
                placeholder="Seleccionar categorias"
              />
            </label>
            <label htmlFor="">
              Caracteristicas
              <TagPicker
                style={{ width: 640 }}
                data={features}
                placeholder="Seleccionar caracteristicas"
                onChange={handleOptionChangeF}
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
                multiple={true}
                onChange={handleImageChangeD}
                className={styles.uploaderN}
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
            <Button
              type="submit"
              appearance="default"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Agregar Producto"}
            </Button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default FormNewProduct;
