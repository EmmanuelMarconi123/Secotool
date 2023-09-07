<<<<<<< HEAD
import { useEffect, useState } from "react";
import { ButtonToolbar, Button } from "rsuite";
import Pagination from "../../pagination/Pagination";
// import NewCategoryModal from "../../newCategoryModal/NewCategoryModal";
// import EditCategoryModal from "../../editCategoryModal/EditCategoryModal";
// import { Snackbar, Alert } from "@mui/material";
import styles from "../politicProduct/PoliticsProduct.module.css";
import PoliticCard from "../../PoliticCard/PoliticCard";
import axios from "axios";
=======
import styles from "./PoliticsProduct.module.css";
import { useEffect, useState } from "react";
import { ButtonToolbar, Button, Modal } from "rsuite";
import PoliticCard from "../../PoliticCard/PoliticCard";
import Pagination from "../../pagination/Pagination";
import ModalPolitica from "./ModalPolitica";
import { Snackbar, Alert } from "@mui/material";
import ModalEditarPolitica from "./ModalEditarPolitica";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
>>>>>>> admin

const PoliticsProduct = () => {
  //------------------------------ CONFIG MODALS--------------->
  const [open, setOpen] = useState(false);
<<<<<<< HEAD
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
=======
  const [openEp, setOpenEp] = useState(false);
  const [politicas, setPoliticas] = useState([]);
  const [selectedPolitic, setSelectedPoitic] = useState({});
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [politicaAEliminar, setPoliticaAEliminar] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);

  const { token } = useAuth();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEp = () => setOpenEp(true);
  const handleCloseEp = () => setOpenEp(false);

  //------------------------DELETE POLITIC----------------------------->

  const showDeleteSuccessAlert = () => {
    setAlertOpen(true);
  };

  const deletePolitic = (politica) => {
    console.log("mostrando la politica: ", politica);
    setPoliticaAEliminar(politica);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleteModalVisible(false);

    try {
      const tokenUsuario = token;

      const response = await axios.delete(
        `http://localhost:8080/v1/api/politics/admin/${politicaAEliminar.id}`,
        {
          headers: {
            Authorization: `Bearer ${tokenUsuario}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(
          `Se ha borrado la politica con id ${politicaAEliminar} correctamente`
        );
        fetchPoliticasAdmin();
        showDeleteSuccessAlert();
      } else {
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      console.error(error);
    }
  };
>>>>>>> admin

  //-------------- CONFIGURACION DE LA PAGINACION -------------------->

  const [currentPage, setCurrentPage] = useState(1);
<<<<<<< HEAD
  const [politicas, setPoliticas] = useState([]);
  const [currentPost, setCurrentPost] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState({});
=======
  const [currentPost, setCurrentPost] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
>>>>>>> admin
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );

<<<<<<< HEAD
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
=======
  //------------------ FUNCION PARA EDITAR POLITICAS ----------------------

  function handleEdit(poli) {
    handleOpenEp();
    setSelectedPoitic(poli);
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

  //---------------------------- TODOS LOS USE-EFFECT -------------------------------

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
    setCurrentPost(politicas.slice(fistPostIndex, lastPostIndex));
  }, [currentPage, politicas]);

  //---------------------------- COMPONENETE -------------------------------------
>>>>>>> admin

  return (
    <div>
      {matches ? (
        <div>
          <div className={styles.container}>
            <div className={styles.upTable}>
<<<<<<< HEAD
              <h1>Todos las Politicas</h1>
=======
              <h1>Todos las Políticas</h1>
>>>>>>> admin
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
<<<<<<< HEAD
                <span>Politíca</span>
                <span>Acciones</span>
              </div>
              {producto.length > 0 ? (
                producto.map((product) => (
                  <PoliticCard
                    key={product.id}
                    name={product.name}
                    politica={product.politica}
=======
                <span>Descripción</span>
                <span>Acciones</span>
              </div>
              {politicas.length > 0 ? (
                politicas.map((poli) => (
                  <PoliticCard
                    key={poli.id}
                    deleteItem={() => deletePolitic(poli)}
                    name={poli.title}
                    description={poli.description}
                    editItem={() => handleEdit(poli)}
>>>>>>> admin
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
<<<<<<< HEAD
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
=======
      <Modal
        open={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
      >
        <Modal.Header>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro que desea borrar la Politica {politicaAEliminar.title}?
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

      {/* ------------------------------------------EDITAR POLITICA MODAL--------------------------> */}
      <ModalEditarPolitica
        handleClose={handleCloseEp}
        open={openEp}
        fetchPoliticasAdmin={fetchPoliticasAdmin}
        selectedPolitic={selectedPolitic}
      />

      {/* --------------------------NUEVA POLITICA MODAL--------------------------------> */}

      <ModalPolitica
        handleClose={handleClose}
        open={open}
        fetchPoliticasAdmin={fetchPoliticasAdmin}
      />
>>>>>>> admin
    </div>
  );
};
export default PoliticsProduct;
