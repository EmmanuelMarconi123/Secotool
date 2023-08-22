import styles from "./Characteristics.module.css";
import { useEffect, useState } from "react";
import Pagination from "../../pagination/Pagination";
import { ButtonToolbar, Button } from "rsuite";
import NewCharacteristicModal from "../../newCharacteristicModal/NewCharacteristicModal";
import AdminCharacteristicCard from "../../adminCharacteristicCard/AdminCharacteristicCard";

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
//     id: 1,
//     name: "Colours",
//     icon: "fa-solid fa-umbrella",
//   },
//   {
//     id: 1,
//     name: "Colours",
//     icon: "fa-solid fa-ghost",
//   },
//   {
//     id: 1,
//     name: "Colours",
//     icon: "fa-solid fa-palette",
//   },
//   {
//     id: 1,
//     name: "Colours",
//     icon: "fa-solid fa-palette",
//   },
//   {
//     id: 1,
//     name: "Colours",
//     icon: "fa-solid fa-palette",
//   },
//   {
//     id: 1,
//     name: "Colours",
//     icon: "fa-solid fa-palette",
//   },
// ];

const Characteristics = () => {
  //------------------------------ CONFIG MODALS--------------->
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEp, setOpenEp] = useState(false);
  const handleOpenEp = () => setOpenEp(true);
  const handleCloseEp = () => setOpenEp(false);

  //-------------- CONFIGURACION DE LA PAGINACION -------------------->

  const [currentPage, setCurrentPage] = useState(1);
  const [characteristics, setCharacteristics] = useState([]);
  const [currentPost, setCurrentPost] = useState([]);

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );

  function deleteItem(id) {
    console.log("Se ha borrado el item con id " + id);
    const newCharacteristics = characteristics.filter(
      (characteistic) => characteistic.id !== id
    );
    setCharacteristics(newCharacteristics);
    console.log(Characteristics);
  }

  // async function deleteItem(id) {
  // try {
  //   const response = await fetch("http://localhost:8080/v1/api/products/{id}");
  //   if (response.ok) {
  //     console.log(`Se ha borrado el item con id ${id} correctamente`);
  //   } else {
  //     throw new Error("Error en la solicitud");
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
  //  }

  useEffect(() => {
    window
      .matchMedia("(min-width: 1024px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  useEffect(() => {
    const fetchCharacteristicsAdmin = async () => {
      try {
        const response = await fetch("http://localhost:8080/v1/api/products/features");
        if (response.ok) {
          const data = await response.json();
          console.log(data); //Borrar este console.log, mas tarde\
          setCharacteristics(data);
        } else {
          throw new Error("Error en la solicitud");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCharacteristicsAdmin();
  }, []);

  useEffect(() => {
    const lastPostIndex = currentPage * 10;
    const fistPostIndex = lastPostIndex - 10;
    setCurrentPost(characteristics.slice(fistPostIndex, lastPostIndex));
  }, [currentPage, characteristics]);

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
                  + Añadir nueva
                </Button>
              </ButtonToolbar>
            </div>
            <div className={styles.tableContainer}>
              <div className={styles.tableHeader}>
                <span>Nombre</span>
                <span>Icono</span>
                <span>Acciones</span>
              </div>
              {characteristics.length > 0 ? (
                currentPost.map((characteristic) => (
                  <AdminCharacteristicCard
                    key={characteristic.id}
                    deleteItem={() => deleteItem(characteristic.id)}
                    name={characteristic.name}
                    icon={characteristic.icon}
                    editItem={() => handleOpenEp()}
                  />
                ))
              ) : (
                <span className={styles.noProducstMessage}>
                  No se encontraron resultados
                </span>
              )}
              <Pagination
                totalPosts={characteristics.length}
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
      {/* --------------------------NUEVA CARACTERÍSTICA MODAL--------------------------------> */}

      <NewCharacteristicModal handleClose={handleClose} open={open}/>

      {/* ------------------------------------------EDITAR PRODUCTO MODAL--------------------------> */}
      <NewCharacteristicModal handleClose={handleCloseEp} open={openEp}/>
    </div>
  );
};
export default Characteristics;
