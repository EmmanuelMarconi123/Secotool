import { Grid, Typography } from "@mui/material";
import styles from "./home.module.css";
//import Card from "../../card/CardProduct";
import FormBusqueda from "../../form/formBusqueda/FormBusqueda";
//import { Link } from "react-router-dom";
import { useState } from "react";
//import Pagination from "../../pagination/Pagination";
import { useEffect } from "react";
import ListProducts from "../../list/ListProducts";

const Home = () => {
  const [productsF, setProductsF] = useState([]);
  // "useEffect usado para el fect de los productos (por ahora es necesario correr el back de local)"
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/v1/api/products");
        if (response.ok) {
          const data = await response.json();
          setProductsF(data)
        } else {
          throw new Error("Error en la solicitud");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  /*-------------- CONFIGURACION DE LA PAGINACION --------------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const lastPostIndex = currentPage * itemsPerPage;
  const fistPostIndex = lastPostIndex - itemsPerPage;
  const currentPost = productsF.slice(fistPostIndex, lastPostIndex);

  // Función para barajar un array utilizando el algoritmo de Fisher-Yates
  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  const shuffledHerramientas = shuffleArray(productsF); //herramienta para hacer aleatoria la forma en que se renderizan las cards
*/
  return (
    <section className={styles.sectionBusqueda}>
      <div className={styles.containerBusqueda}>
        <div className={styles.bgBusqueda}></div>
        <Typography variant="h6" className={styles.titulo}>
          ¿Qué herramienta necesitas?
        </Typography>
        <FormBusqueda />
      </div>
      <div className={styles.contenedorCards}>
        <Grid container justifyContent="center" alignItems="center">
          <ListProducts products={productsF}/>
          {/*{shuffledHerramientas &&
            currentPost.map((product) => (
              <Grid key={product.id} item xs={6} md={6} className={styles.card}>
                <Link to={"/product/" + product.id} key={product.id}>
                  <Card
                    product={product}
                  />
                </Link>
              </Grid>
            ))}
          <Pagination
            totalPosts={productsF.length}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            />*/}
        </Grid>
      </div>
    </section>
  );
};

export default Home;
