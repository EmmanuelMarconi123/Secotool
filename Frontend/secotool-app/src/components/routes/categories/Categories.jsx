import styles from "./Categories.module.css";
import { useEffect, useState } from "react";
import { ButtonToolbar, Button } from "rsuite";
import AdminCategoryCard from "../../adminCategoryCard/AdminCategoryCard";
import Pagination from "../../pagination/Pagination";
import NewCategoryModal from "../../newCategoryModal/NewCategoryModal";
import EditCategoryModal from "../../editCategoryModal/EditCategoryModal";

const Categories = () => {
  //------------------------------ CONFIG MODALS--------------->
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEp, setOpenEp] = useState(false);
  const handleOpenEp = () => setOpenEp(true);
  const handleCloseEp = () => setOpenEp(false);

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

  async function deleteCategory(id) {
    if (confirm("¿Está seguro que desea borrar esta categoría?"))
      try {
        const response = await fetch(
          `http://localhost:8080/v1/api/categories/${id}`,
          { method: "DELETE" }
        );
        if (response.ok) {
          console.log(`Se ha borrado el item con id ${id} correctamente`);
          fetchCategoriesAdmin();
        } else {
          throw new Error("Error en la solicitud");
        }
      } catch (error) {
        console.error(error);
      }
  }

  const fetchCategoriesAdmin = async () => {
    try {
      const response = await fetch("http://localhost:8080/v1/api/categories");
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
