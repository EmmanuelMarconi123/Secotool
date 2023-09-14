import styles from "./Features.module.css";
import { useEffect, useState } from "react";
import Pagination from "../../pagination/Pagination";
import { ButtonToolbar, Button} from "rsuite";
import NewFeatureModal from "../../newFeatureModal/NewFeatureModal";
import AdminFeatureCard from "../../adminFeatureCard/AdminFeatureCard";
import EditFeatureModal from "../../editFeatureModal/EditFeatureModal";
import { useAuth } from "../../../contexts/AuthContext";
import { Snackbar, Alert } from "@mui/material";
import { useGlobal } from "../../../contexts/GlobalContext";
import EsqueletorAdmin from "../../EsqueletorAdmin/EsqueletorAdmin";

// const icons = [
//   {
//     id: 1,
//     name: "Colours",
//     icon: "fa-solid fa-palette",
//   },
//   {
//     id: 2,
//     name: "Home",
//     icon: "fa-solid fa-house",
//   },
//   {
//     id: 3,
//     name: "Umbrella",
//     icon: "fa-solid fa-cloud",
//   },
//   {
//     id: 4,
//     name: "Tree",
//     icon: "fa-solid fa-filter",
//   },
//   {
//     id: 5,
//     name: "Colours",
//     icon: "fa-solid fa-umbrella",
//   },
//   {
//     id: 6,
//     name: "Colours",
//     icon: "fa-solid fa-ghost",
//   },
//   {
//     id: 7,
//     name: "Colours",
//     icon: "fa-solid fa-palette",
//   },
//   {
//     id: 8,
//     name: "Colours",
//     icon: "fa-solid fa-palette",
//   },
//   {
//     id: 9,
//     name: "Colours",
//     icon: "fa-solid fa-palette",
//   },
//   {
//     id: 10,
//     name: "Colours",
//     icon: "fa-solid fa-palette",
//   },
// ];

const Features = () => {
  const { token } = useAuth();
  const { globalVariable } = useGlobal();
  //------------------------------ CONFIG MODALS--------------->
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEp, setOpenEp] = useState(false);
  const handleOpenEp = () => setOpenEp(true);
  const handleCloseEp = () => setOpenEp(false);

  //--------------------DELETE ALERT-------------------->
  const [alertOpen, setAlertOpen] = useState(false);
  const showDeleteSuccessAlert = () => {
    setAlertOpen(true);
  };

  //-------------- CONFIGURACION DE LA PAGINACION -------------------->

  const [currentPage, setCurrentPage] = useState(1);
  const [features, setFeatures] = useState([]);
  const [currentPost, setCurrentPost] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState({});
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );

  function handleEdit(feature) {
    handleOpenEp();
    setSelectedFeature(feature);
  }

  async function deleteFeature(id) {
    if (confirm("¿Está seguro que desea borrar esta característica?"))
      try {
        const response = await fetch(
          `${globalVariable}/v1/api/features/admin/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.ok) {
          console.log(`Se ha borrado el item con id ${id} correctamente`);
          fetchFeaturesAdmin();
          showDeleteSuccessAlert();
        } else {
          throw new Error("Error en la solicitud");
        }
      } catch (error) {
        console.error(error);
      }
  }

  const fetchFeaturesAdmin = async () => {
    try {
      const response = await fetch(
        `${globalVariable}/v1/api/features/open`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data); //Borrar este console.log, mas tarde\
        setFeatures(data);
        setCargando(false)
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
    fetchFeaturesAdmin();
  }, []);

  useEffect(() => {
    const lastPostIndex = currentPage * 10;
    const fistPostIndex = lastPostIndex - 10;
    setCurrentPost(features.slice(fistPostIndex, lastPostIndex));
  }, [currentPage, features]);

//-------------------------------------LOUDER-----------------------------------

    const [cargando, setCargando] = useState(true)

    const renderFeatures = features.length > 0 ? (
      currentPost.map((feature) => (
        <AdminFeatureCard
          key={feature.id}
          deleteItem={() => deleteFeature(feature.id)}
          name={feature.name}
          icon={feature.icon}
          editItem={() => handleEdit(feature)}
        />
      ))
    ) : (
      <span className={styles.noProducstMessage}>
        No se encontraron resultados
      </span>
    )
  
//-------------------------------------COMPONENTE-----------------------------------

  return (
    <div>
      {matches ? (
        <div>
          <div className={styles.container}>
            <div className={styles.upTable}>
              <h1>Todos las características</h1>
              <ButtonToolbar className={styles.buttonToolbarRight}>
                <Button
                  onClick={handleOpen}
                  style={{ background: "#45A42D", color: "#F9F9F9" }}
                >
                  + Añadir Característica
                </Button>
              </ButtonToolbar>
            </div>
            <div className={styles.tableContainer}>
              <div className={styles.tableHeader}>
                <span>Nombre</span>
                <span>Icono</span>
                <span>Acciones</span>
              </div>
              {cargando? <EsqueletorAdmin/> : renderFeatures}
              <Pagination
                totalPosts={features.length}
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
      {/* --------------------------NUEVA CARACTERÍSTICA MODAL--------------------------------> */}
      <NewFeatureModal
        handleClose={handleClose}
        open={open}
        getData={() => fetchFeaturesAdmin()}
      />
      {/* ------------------------------------------EDITAR PRODUCTO MODAL--------------------------> */}
      <EditFeatureModal
        handleClose={handleCloseEp}
        open={openEp}
        getData={() => fetchFeaturesAdmin()}
        selectedFeature={selectedFeature}
      />
    </div>
  );
};
export default Features;
