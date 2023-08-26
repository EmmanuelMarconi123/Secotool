import styles from "./HomeAdmin.module.css";
import AdminProductCard from "../../adminProductCard/AdminProductCard";
import { useEffect, useState } from "react";
import Pagination from "../../pagination/Pagination";
import { ButtonToolbar, Button, } from "rsuite";
import { Alert, Snackbar } from "@mui/material";
import FormNewProduct from "../../form/formNewProduct/FormNewProduct";
import FormEditProduct from "../../form/FormEditProduct";

const HomeAdmin = () => {
  //----------------------------TRAE TODOS LOS PRODUCTOS----------------------------->
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

  useEffect(() => {
    fetchProductsAdmin();
  }, []);

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

  //---------------------------EDIT PRODUCT------------------------------------>
  const handleProductUpdate = (updatedProduct) => {
    // Buscar el índice del producto en la lista
    const productIndex = products.findIndex(p => p.id === updatedProduct.id);

    if (productIndex !== -1) {
      // Crear una nueva lista de productos con el producto actualizado
      const updatedProducts = [...products];
      updatedProducts[productIndex] = updatedProduct;

      // Actualizar el estado de la lista de productos
      setProducts(updatedProducts);
    }
  }
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
      />
      {/* ------------------------------------------EDITAR PRODUCTO MODAL--------------------------> */}
      <FormEditProduct
        openEp={openEp}
        handleCloseEp={handleCloseEp}
        selectedProduct={selectedProduct}
        onProductUpdate={handleProductUpdate}
      />
    </div>
  );
};
export default HomeAdmin
