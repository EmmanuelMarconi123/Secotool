import styles from "./HomeAdmin.module.css";
import AdminProductCard from "../../adminProductCard/AdminProductCard";
import { useEffect, useState } from "react";
import Pagination from "../../pagination/Pagination";

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


  //-------------- CONFIGURACION DE LA PAGINACION -------------------->

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const lastPostIndex = currentPage * itemsPerPage;
  const fistPostIndex = lastPostIndex - itemsPerPage;
  const currentPost = productsAd.slice(fistPostIndex, lastPostIndex);

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );

  const [products, setProducts] = useState(productsAd);

  function deleteItem(id) {
    console.log("Se ha borrado el item con id " + id);
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);
    console.log(products);
  }

  useEffect(() => {
    window
      .matchMedia("(min-width: 1024px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  return (
    <div>
      {matches ? (
        <div>
          <div className={styles.container}>
            <h1
              style={{ fontWeight: "400", fontSize: "19px", padding: "16px 0" }}
            >
              Todos los productos
            </h1>
            <div className={styles.tableContainer}>
              <div className={styles.tableHeader}>
                <span>ID</span>
                <span>Nombre</span>
                <span>Acciones</span>
              </div>
              {products &&
                currentPost.map((product) => (
                  <AdminProductCard
                    key={product.id}
                    deleteItem={() => deleteItem(product.id)}
                    id={product.id}
                    title={product.name}
                  />
                ))}
              <Pagination
                totalPosts={productsAd.length}
                itemsPerPage={itemsPerPage}
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
            justifyContent: "center",
            height: "100vh",
          }}
        >
          Por favor ingrese desde un dispositivo mas grande
        </span>
      )}
    </div>
  );
};
export default HomeAdmin;
