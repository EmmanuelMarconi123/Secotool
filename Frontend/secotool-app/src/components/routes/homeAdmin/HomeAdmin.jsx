import styles from "./HomeAdmin.module.css";
import AdminProductCard from "../../adminProductCard/AdminProductCard";
import { useEffect, useState } from "react";
import Pagination from "../../pagination/Pagination";
import { ButtonToolbar, Button, Uploader, TagPicker } from "rsuite";
import Modal from "rsuite/Modal";

const HomeAdmin = () => {
  const [productsAd, setProductsAd] = useState([]);
  // "useEffect usado para el fect de los productos (por ahora es necesario correr el back de local)"
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/v1/api/products");
        if (response.ok) {
          const data = await response.json();
          setProductsAd(data);
        } else {
          throw new Error("Error en la solicitud");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  //------------------------------CONFIG MULTICASCADA---------------------->
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

  //------------------------------ CONFIG MODALS--------------->
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEp, setOpenEp] = useState(false);
  const handleOpenEp = () => setOpenEp(true);
  const handleCloseEp = () => setOpenEp(false);

  //-------------- CONFIGURACION DE LA PAGINACION -------------------->

  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [currentPost, setCurrentPost] = useState([]);

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );

  function deleteItem(id) {
    console.log("Se ha borrado el item con id " + id);
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);
    console.log(products);
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
    const fetchProductsAdmin = async () => {
      try {
        const response = await fetch("http://localhost:8080/v1/api/products");
        if (response.ok) {
          const data = await response.json();
          console.log(data); //Borrar este console.log, mas tarde\
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
                    deleteItem={() => deleteItem(product.id)}
                    id={product.id}
                    title={product.name}
                    editItem={() => handleOpenEp()}
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
      {/* --------------------------NUEVO PRODUCTO MODAL--------------------------------> */}
      <Modal size="md" open={open} onClose={handleClose} overflow={false}>
        <Modal.Header>
          <Modal.Title style={{ textAlign: "center", fontSize: 23 }}>
            Nuevo Producto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.containerModal}>
          <div className={styles.centeredForm}>
            <form className={styles.formNewProduct} action="">
              <label htmlFor="">
                Nombre del producto
                <input type="text" />
              </label>
              <label htmlFor="">
                Descripcion
                <textarea
                  cols="30"
                  rows="10"
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
                <input type="number" />
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
              <label htmlFor="">
                Nombre del producto
                <input type="text" />
              </label>
              <label htmlFor="">
                Descripcion
                <textarea
                  cols="30"
                  rows="10"
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
                <input type="number" />
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
              <button>Agregar Producto</button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default HomeAdmin;
