import styles from "./Categories.module.css";
import { useEffect, useState } from "react";
import { ButtonToolbar, Button, Modal } from "rsuite";
import AdminCategoryCard from "../../adminCategoryCard/AdminCategoryCard";
import Pagination from "../../pagination/Pagination";
import NewCategoryModal from "../../newCategoryModal/NewCategoryModal";
import EditCategoryModal from "../../editCategoryModal/EditCategoryModal";
import { Snackbar, Alert } from "@mui/material";

const Categories = () => {
  //------------------------------ CONFIG MODALS--------------->
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEp, setOpenEp] = useState(false);
  const handleOpenEp = () => setOpenEp(true);
  const handleCloseEp = () => setOpenEp(false);

  //-----------------------------BORRAR CATEGORIA------------------------>
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
    console.log(selectedCategory)
  };

  const handleConfirmDelete = async () => {
    setIsDeleteModalVisible(false);
    console.log(selectedCategory)

    // Realiza la eliminación del producto aquí
    try {
      const response = await fetch(
        `http://localhost:8080/v1/api/categories/admin/{id}${selectedCategory}`,
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

  function handleEdit(category) {
    handleOpenEp();
    setSelectedCategory(category);
  }

  // async function deleteCategory(id) {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:8080/v1/api/categories/${id}`,
  //         { method: "DELETE" }
  //       );
  //       if (response.ok) {
  //         console.log(`Se ha borrado el item con id ${id} correctamente`);
  //         fetchCategoriesAdmin();
  //         showDeleteSuccessAlert();
  //       } else {
  //         throw new Error("Error en la solicitud");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  // }

  const fetchCategoriesAdmin = async () => {
    try {
      const response = await fetch("http://localhost:8080/v1/api/categories/open");
      if (response.ok) {
        const data = await response.json();
        console.log(data); //Borrar este console.log, mas tarde\
        serCategories(data);
      } else {
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window
      .matchMedia("(min-width: 1024px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  useEffect(() => {
    fetchCategoriesAdmin();
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
              <h1>Todos las categorías</h1>
              <ButtonToolbar className={styles.buttonToolbarRight}>
                <Button
                  onClick={handleOpen}
                  style={{ background: "#45A42D", color: "#F9F9F9" }}
                >
                  + Agregar categoría
                </Button>
              </ButtonToolbar>
            </div>
            <div className={styles.tableContainer}>
              <div className={styles.tableHeader}>
                <span>Nombre</span>
                <span>Descripción</span>
                <span>Imagen</span>
                <span>Acciones</span>
              </div>
              {categories.length > 0 ? (
                currentPost.map((category) => (
                  <AdminCategoryCard
                    key={category.id}
                    deleteItem={() => deleteCategory(category.id)}
                    name={category.name}
                    icon={category.name}
                    description={category.description}
                    image={category.image.url}
                    editItem={() => handleEdit(category)}
                  />
                ))
              ) : (
                <span className={styles.noProducstMessage}>
                  No se encontraron resultados
                </span>
              )}
              <Pagination
                totalPosts={categories.length}
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
          <button onClick={() => setIsDeleteModalVisible(false)} style={{backgroundColor: "red"}}>
            Cancelar
          </button>
          <button onClick={handleConfirmDelete} style={{backgroundColor: "green"}}>Confirmar</button>
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
      {/* --------------------------NUEVA CARACTERÍSTICA MODAL--------------------------------> */}

      <NewCategoryModal
        handleClose={handleClose}
        open={open}
        getData={() => fetchCategoriesAdmin()}
      />

      {/* ------------------------------------------EDITAR PRODUCTO MODAL--------------------------> */}
      <EditCategoryModal
        handleClose={handleCloseEp}
        open={openEp}
        getData={() => fetchCategoriesAdmin()}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};
export default Categories;
