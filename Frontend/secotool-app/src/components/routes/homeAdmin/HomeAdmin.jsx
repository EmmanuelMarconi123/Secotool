import styles from "./HomeAdmin.module.css";
import AdminProductCard from "../../adminProductCard/AdminProductCard";
import { useEffect, useState } from "react";
import Pagination from "../../pagination/Pagination";
import { ButtonToolbar, Button, Uploader, TagPicker } from "rsuite";
import Modal from "rsuite/Modal";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";

const HomeAdmin = () => {
  //------------------------------ CONFIG MODALS--------------->
  const [open, setOpen] = useState(false); //NEW PRODUCT MODAL
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [openEp, setOpenEp] = useState(false); // EDIT PRODUCT MODAL
  const [selectedProduct, setSelectedProduct] = useState([]);
  const handleOpenEp = (product) => {
    setSelectedProduct(product);
    setOpenEp(true);
  };
  const handleCloseEp = () => setOpenEp(false);
  //--------------------------------NEW PRODUCT---------------------->
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]); // Estado para las imágenes cargadas
  

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files); // Convertir FileList a un array
    setUploadedImages(selectedImages);
  };


  const handleNewProductSubmit = async (e) => {
    e.preventDefault();

    const dataC = { name, category, description, price };

    const json = JSON.stringify(dataC)
    const blob = new Blob([json], {
      type: 'application/json'
    })

    
    const formData = new FormData();
    formData.append("data", blob)
    uploadedImages.forEach((image) => {
      formData.append("images", image);
    });

    console.log(dataC);
    console.log(formData)

    axios({
      method: "post",
      url: "http://localhost:8080/v1/api/products",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  //---------------------------------DELETE PRODUCT------------------------------->

  const [alertOpen, setAlertOpen] = useState(false);
  const showDeleteSuccessAlert = () => {
    setAlertOpen(true);
  };
  async function deleteProduct(productId) {
    try {
      const response = await fetch(
        `http://localhost:8080/v1/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log(`Producto con ID ${productId} eliminado correctamente`);
        // Aquí podrías actualizar tu lista de productos eliminando el producto con el ID correspondiente
        setProducts(products.filter((product) => product.id !== productId));
        showDeleteSuccessAlert(); // Muestra la alerta de éxito
      } else {
        throw new Error("Error al eliminar el producto");
      }
    } catch (error) {
      console.error(error);
    }
  }

  //---------------------------------------EDIT PRODUCT-------------------->
  
  const [editedName, setEditedName] = useState(selectedProduct.name);
  const [editedDescription, setEditedDescription] = useState(selectedProduct.description);

  const handleNameChange = (event) => {
    setEditedName(event.target.value);
  };
  
  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
  };

  async function editProduct(productId) {
    try {
      const response = await fetch(`http://localhost:8080/v1/api/products/${productId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          name: editedName,
          description: editedDescription,
        }),
      });
  
      if (response.ok) {
        console.log(`Producto con ID ${productId} editado correctamente`);
        // Cierra el modal de edición
        handleCloseEp();
      } else {
        throw new Error('Error al editar el producto');
      }
    } catch (error) {
      console.error(error);
    }
  }

  //------------------------------DATOS---------------------->
  const categories = [
    "Electrónica",
    "Ropa",
    "Hogar",
    "Deportes",
    "Alimentos",
    "Libros",
  ].map((item) => ({ label: item, value: item }));

  const features = [
    "Alta calidad",
    "Resistente al agua",
    "Conectividad inalámbrica",
    "Diseño ergonómico",
    "Batería de larga duración",
    "Tecnología de última generación",
  ].map((item) => ({ label: item, value: item }));


  //-------------- CONFIGURACION DE LA PAGINACION -------------------->

  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [currentPost, setCurrentPost] = useState([]);

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 1024px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  useEffect(() => {
    const fetchProductsAdmin = async () => {
      try {
        const response = await fetch("http://localhost:8080/v1/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          throw new Error("Error en la solicitud");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductsAdmin();
  }, []);

  useEffect(() => {
    const lastPostIndex = currentPage * 10;
    const fistPostIndex = lastPostIndex - 10;
    setCurrentPost(products.slice(fistPostIndex, lastPostIndex));
  }, [currentPage, products]);

  return (
    <div>
      {matches ? (
        <div>
          <div className={styles.container}>
            <div className={styles.upTable}>
              <h1>Todos los productos</h1>
              <ButtonToolbar className={styles.buttonToolbarRight}>
                <Button
                  onClick={handleOpen}
                  style={{ background: "#45A42D", color: "#F9F9F9" }}
                >
                  + Agregar Producto
                </Button>
              </ButtonToolbar>
            </div>
            <div className={styles.tableContainer}>
              <div className={styles.tableHeader}>
                <span>ID</span>
                <span>Nombre</span>
                <span>Acciones</span>
              </div>
              {products.length > 0 ? (
                currentPost.map((product) => (
                  <AdminProductCard
                    key={product.id}
                    deleteItem={() => deleteProduct(product.id)}
                    id={product.id}
                    title={product.name}
                    editItem={() => handleOpenEp(product)}
                  />
                ))
              ) : (
                <span className={styles.noProducstMessage}>
                  No se encontraron resultados
                </span>
              )}
              <Pagination
                totalPosts={products.length}
                itemsPerPage={10}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      ) : (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          Por favor ingrese desde un dispositivo más grande
        </span>
      )}
      {/* -----------------------DELETE ALERT---------------------> */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000} // Duración en milisegundos
        onClose={() => setAlertOpen(false)}
      >
        <Alert onClose={() => setAlertOpen(false)} severity="success">
          Producto eliminado correctamente.
        </Alert>
      </Snackbar>
      {/* --------------------------NUEVO PRODUCTO MODAL--------------------------------> */}
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
                  style={{ height: 120, width: 640 }}
                ></textarea>
              </label>
              <label htmlFor="">
                Categorias
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
              </label>
              <label htmlFor="">
                Caracteristicas
                <TagPicker style={{ width: 640 }} data={features} />
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
                <input type="file" onChange={handleImageChange} accept="image/*" multiple  />
              </label>
              <div className={styles.labelSeparator}></div>
              <button>Agregar Producto</button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      {/* ------------------------------------------EDITAR PRODUCTO MODAL--------------------------> */}
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
                <input type="text" defaultValue={selectedProduct.name} onChange={handleNameChange}/>
              </label>
              <label htmlFor="editDescription">
                Descripcion
                <textarea
                  cols="30"
                  rows="10"
                  defaultValue={selectedProduct.description}
                  onChange={handleDescriptionChange}
                  style={{ height: 120, width: 640 }}
                ></textarea>
              </label>
              <label htmlFor="">
                Categorias
                <TagPicker style={{ width: 640 }} data={categories} />
              </label>
              <label htmlFor="">
                Caracteristicas
                <TagPicker style={{ width: 640 }} data={features} />
              </label>
              <label htmlFor="">
                Precio
                <input type="number" defaultValue={selectedProduct.price} />
              </label>
              <label htmlFor="">
                Imagenes
                <Uploader draggable>
                  <div
                    style={{
                      height: 54,
                      width: 640,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      borderRadius: 8,
                    }}
                  >
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                    <span>Subir imagen</span>
                  </div>
                </Uploader>
              </label>
              <div className={styles.labelSeparator}></div>
              <button onClick={() => editProduct(selectedProduct.id)}>Guardar Cambios</button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default HomeAdmin;
