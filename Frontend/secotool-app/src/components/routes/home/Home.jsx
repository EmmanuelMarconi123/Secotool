import styles from "./home.module.css";
import FormBusqueda from "../../form/formBusqueda/FormBusqueda";
import { useState } from "react";
import { useEffect } from "react";
import ListProducts from "../../list/ListProducts";
import { Typography } from "@mui/material";
import { useFunction } from "../../../contexts/FunctionsContext";

const Home = () => {

  const {isLiked} = useFunction()

  const [productsF, setProductsF] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/v1/api/products/random"
        );
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
  }, [isLiked]);

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
        <ListProducts products={productsF}/>
      </div>
    </section>
  );
};

export default Home;
