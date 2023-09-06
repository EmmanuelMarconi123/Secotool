import styles from "./PoliticsProduct.module.css";
import { useEffect, useState } from "react";
import { ButtonToolbar, Button, Modal } from "rsuite";
import PoliticCard from "../../PoliticCard/PoliticCard";
import Pagination from "../../pagination/Pagination";
import ModalPolitica from "./ModalPolitica";
import { Snackbar, Alert } from "@mui/material";
import axios from "axios";
import ModalEditarPolitica from "./ModalEditarPolitica";

const PoliticsProduct = () => {
  //------------------------------ CONFIG MODALS--------------->
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEp, setOpenEp] = useState(false);
  const [politicas, setPoliticas] = useState([]);
  const handleOpenEp = () => setOpenEp(true);
  const handleCloseEp = () => setOpenEp(false);

  //----------------------------------------------------->
  const [alertOpen, setAlertOpen] = useState(false);
  const showDeleteSuccessAlert = () => {
    setAlertOpen(true);
  };
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState("");

  const deleteCategory = (category) => {
    setCategoryToDelete(category.name); // Establece el nombre de la categoría
    setSelectedCategory(category);
    setIsDeleteModalVisible(true);
    console.log(selectedCategory);
  };

  const handleConfirmDelete = async () => {
    setIsDeleteModalVisible(false);
    console.log(selectedCategory);

    // Realiza la eliminación del producto aquí
    try {
      const response = await fetch(
        `http://localhost:8080/v1/api/categories/${selectedCategory}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        console.log(
          `Se ha borrado el item con id ${selectedCategory} correctamente`
        );
        fetchCategoriesAdmin();
        showDeleteSuccessAlert();
      } else {
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //-------------- CONFIGURACION DE LA PAGINACION -------------------->

  const [currentPage, setCurrentPage] = useState(1);
  const [categories, serCategories] = useState([]);
  const [currentPost, setCurrentPost] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );


  function handleEdit(politic) {
    handleOpenEp();
    setSelectedCategory(politic);
  }

  //-------------------FETCH DE LAS POLITICAS-------------------------

  const fetchPoliticasAdmin = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/v1/api/politics/open"
      );
      if (response.ok) {
        const data = await response.json();
        console.log("las politicas son ", data);
        setPoliticas(data);
      } else {
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //-------------------DELETE DE LAS POLITICAS-------------------------


  // const handleConfirmDelete = async() =>{
  //   try{
  //     const deletePolitica = await axios.delete(`http://localhost:8080/v1/api/politics/admin/${id}`)
  //   }
  // }


  //-------------------------------------------------------------------


  useEffect(() => {
    window
      .matchMedia("(min-width: 1024px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  useEffect(() => {
    fetchPoliticasAdmin();
  }, []);

  useEffect(() => {
    const lastPostIndex = currentPage * 10;
    const fistPostIndex = lastPostIndex - 10;
    setCurrentPost(categories.slice(fistPostIndex, lastPostIndex));
  }, [currentPage, categories]);

  return (
    <div>
      {matches ? (
        <div>
          <div className={styles.container}>
            <div className={styles.upTable}>
              <h1>Todos las Políticas</h1>
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
                <span>Descripción</span>
                <span>Acciones</span>
              </div>
              {politicas.length > 0 ? (
                politicas.map((poli) => (
                  <PoliticCard
                    key={poli.id}
                    deleteItem={() => deleteCategory(poli.id)}
                    name={poli.title}
                    description={poli.description}
                    editItem={() => handleEdit(poli)}
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
      <Modal
        open={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
      >
        <Modal.Header>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro que desea borrar la categoría {categoryToDelete}?
        </Modal.Body>
        <Modal.Footer className={styles.modalButtons}>
          <button
            onClick={() => setIsDeleteModalVisible(false)}
            style={{ backgroundColor: "red" }}
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmDelete}
            style={{ backgroundColor: "green" }}
          >
            Confirmar
          </button>
        </Modal.Footer>
      </Modal>

      <Snackbar
        open={alertOpen}
        autoHideDuration={3000} // Duración en milisegundos
        onClose={() => setAlertOpen(false)}
      >
        <Alert onClose={() => setAlertOpen(false)} severity="success">
          Producto eliminado correctamente.
        </Alert>
      </Snackbar>

      {/* ------------------------------------------EDITAR POLITICA MODAL--------------------------> */}
      <ModalEditarPolitica
        handleClose={handleCloseEp}
        open={openEp}
        getData={() => fetchPoliticasAdmin()}
        selectedCategory={selectedCategory}
      />

      {/* --------------------------NUEVA POLITICA MODAL--------------------------------> */}

      <ModalPolitica
        handleClose={handleClose}
        open={open}
        getData={() => fetchPoliticasAdmin()}
      />
    </div>
  );
};
export default PoliticsProduct;
