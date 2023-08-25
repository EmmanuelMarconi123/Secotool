import styles from "./HomeAdmin.module.css";
import AdminProductCard from "../../adminProductCard/AdminProductCard";
import { useEffect, useState } from "react";
import Pagination from "../../pagination/Pagination";
import { ButtonToolbar, Button, } from "rsuite";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import FormNewProduct from "../../form/formNewProduct/FormNewProduct"
import FormEditProduct from "../../form/FormEditProduct";

const HomeAdmin = () => {
  //------------------------------ CONFIG MODALS--------------->
  const [open, setOpen] = useState(false); //NEW PRODUCT MODAL
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [openEp, setOpenEp] = useState(false); // EDIT PRODUCT MODAL
  const [selectedProduct, setSelectedProduct] = useState({});
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


  const handleImageChangeD = (fileList) => {
    setUploadedImages([...uploadedImages, ...fileList]);
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
    uploadedImages.forEach((file) => {
      formData.append('images', file.blobFile); // Use a key like 'images'
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
        handleClose()
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

  useEffect(() => {
    setEditedProduct({
      name: selectedProduct.name,
      description: selectedProduct.description,
      price: selectedProduct.price,
    });
  }, [selectedProduct]);
  
  const [editedProduct, setEditedProduct] = useState({
    name: '',
    description: '',
    price: 0,
  });

  const handleFieldChange = (field, value) => {
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  };

  const handleUpdateProduct = () => {
    const productId = selectedProduct.id;
  
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(editedProduct),
    };

    fetch(`http://localhost:8080/v1/api/products/${productId}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Producto actualizado:', data);
        // Limpiar el estado después de la actualización
        setEditedProduct({
          name: '',
          description: '',
          price: 0,
        });
        // Cerrar el modal
        handleCloseEp();
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
      });
  };


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

  //---------------------------------FETCH TODOS LOS PRODUCTOS------------------>

  useEffect(() => {
    const fetchProductsAdmin = async () => {
      try {
        const response = await fetch("http://localhost:8080/v1/api/products/all");
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
      <FormNewProduct
        open={open}
        handleClose={handleClose}
        handleNewProductSubmit={handleNewProductSubmit}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        category={category}
        setCategory={setCategory}
        price={price}
        setPrice={setPrice}
        handleImageChangeD={handleImageChangeD}
      />
      {/* ------------------------------------------EDITAR PRODUCTO MODAL--------------------------> */}
      <FormEditProduct
        openEp={openEp}
        handleCloseEp={handleCloseEp}
        editedProduct={editedProduct}
        handleFieldChange={handleFieldChange}
        handleUpdateProduct={handleUpdateProduct}
      />
    </div>
  );
};
export default HomeAdmin;
