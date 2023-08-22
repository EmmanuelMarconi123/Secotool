import styles from "./home.module.css";
import FormBusqueda from "../../form/formBusqueda/FormBusqueda";
import { useState } from "react";
import { useEffect } from "react";
import ListProducts from "../../list/ListProducts";
import { Typography } from "@mui/material";

const Home = () => {
  const [productsF, setProductsF] = useState([]);
  // "useEffect usado para el fect de los productos (por ahora es necesario correr el back de local)"
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/v1/api/products");
        if (response.ok) {
          const data = await response.json();
          setProductsF(data);
        } else {
          throw new Error("Error en la solicitud");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

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
        <ListProducts products={productsF} />
      </div>
    </section>
  );
};

export default Home;
