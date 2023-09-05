import { useEffect, useState } from "react";
import { ButtonToolbar, Button } from "rsuite";
import Pagination from "../../pagination/Pagination";
// import NewCategoryModal from "../../newCategoryModal/NewCategoryModal";
// import EditCategoryModal from "../../editCategoryModal/EditCategoryModal";
// import { Snackbar, Alert } from "@mui/material";
import styles from "../politicProduct/PoliticsProduct.module.css";
import PoliticCard from "../../PoliticCard/PoliticCard";
import axios from "axios";

const PoliticsProduct = () => {
  //------------------------------ CONFIG MODALS--------------->
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEp, setOpenEp] = useState(false);
  const handleOpenEp = () => setOpenEp(true);
  const handleCloseEp = () => setOpenEp(false);
  const [producto, setProducto] = useState([]);

  //-----------------------------ALERTA BORRAR------------------------>
  // const [alertOpen, setAlertOpen] = useState(false);
  // const showDeleteSuccessAlert = () => {
  //   setAlertOpen(true);
  // };

  //-------------- CONFIGURACION DE LA PAGINACION -------------------->

  const [currentPage, setCurrentPage] = useState(1);
  const [politicas, setPoliticas] = useState([]);
  const [currentPost, setCurrentPost] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState({});
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );

  // function handleEdit(category) {
  //   handleOpenEp();
  //   setSelectedCategory(category);
  // }

  // async function deleteCategory(id) {
  //   if (confirm("¿Está seguro que desea borrar esta Politica?"))
  //     try {
  //       const response = await fetch(
  //         `http://localhost:8080/v1/api/categories/${id}`,
  //         { method: "DELETE" }
  //       );
  //       if (response.ok) {
  //         console.log(`Se ha borrado la politica con id ${id} correctamente`);
  //         fetchCategoriesAdmin();
  //         showDeleteSuccessAlert();
  //       } else {
  //         throw new Error("Error en la solicitud");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  // }

  //------------------- Fetch de productos ---------------------------

  // const fetchPoliticas = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8080/v1/api/politicas");
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data);
  //       setPoliticas(data);
  //     } else {
  //       throw new Error("Error en la solicitud");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  //------------------- Fetch de productos ---------------------------

  const fetchProductos = async () => {
    try {
       await axios
        .get("http://localhost:8080/v1/api/products/all")
        .then((response) => {
          if (response.status === 200) {
            console.log("aca va la resp ", response.data);
            setProducto(response.data);
            console.log('aca va el producto',producto);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    
    //------------------------------------------------------------------
    useEffect(() => {
      window
      .matchMedia("(min-width: 1024px)")
      .addEventListener("change", (e) => setMatches(e.matches));
      fetchProductos();
    }, []);
    
  //   useEffect(() => {
  //     fetchPoliticas();
  // }, []);

  // useEffect(() => {
  //   const lastPostIndex = currentPage * 10;
  //   const fistPostIndex = lastPostIndex - 10;
  //   setCurrentPost(politicas.slice(fistPostIndex, lastPostIndex));
  // }, [currentPage, politicas]);

  return (
    <div>
      {matches ? (
        <div>
          <div className={styles.container}>
            <div className={styles.upTable}>
              <h1>Todos las Politicas</h1>
              <ButtonToolbar className={styles.buttonToolbarRight}>
                <Button
                  onClick={handleOpen}
                  style={{ background: "#45A42D", color: "#F9F9F9" }}
                >
                  + Agregar Politica
                </Button>
              </ButtonToolbar>
            </div>
            <div className={styles.tableContainer}>
              <div className={styles.tableHeader}>
                <span>Nombre</span>
                <span>Politíca</span>
                <span>Acciones</span>
              </div>
              {producto.length > 0 ? (
                producto.map((product) => (
                  <PoliticCard
                    key={product.id}
                    name={product.name}
                    politica={product.politica}
                  />
                ))
              ) : (
                <span className={styles.noProducstMessage}>
                  No se encontraron resultados
                </span>
              )}
              <Pagination
                totalPosts={politicas.length}
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
      {/* ---------------------------------------------DELETE ALERT-------------------------- */}
      {/* <Snackbar
        open={alertOpen}
        autoHideDuration={3000} // Duración en milisegundos
        onClose={() => setAlertOpen(false)}
      >
        <Alert onClose={() => setAlertOpen(false)} severity="success">
          Producto eliminado correctamente.
        </Alert>
      </Snackbar> */}
      {/* --------------------------NUEVA CARACTERÍSTICA MODAL--------------------------------> */}

      {/* <NewCategoryModal
        handleClose={handleClose}
        open={open}
        getData={() => fetchCategoriesAdmin()}
      /> */}

      {/* ------------------------------------------EDITAR PRODUCTO MODAL--------------------------> */}
      {/* <EditCategoryModal
        handleClose={handleCloseEp}
        open={openEp}
        getData={() => fetchCategoriesAdmin()}
        selectedCategory={selectedCategory}
      /> */}
    </div>
  );
};
export default PoliticsProduct;
