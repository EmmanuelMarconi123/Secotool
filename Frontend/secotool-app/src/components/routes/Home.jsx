import { Grid, Typography } from "@mui/material";
import styles from "../routes/home.module.css";
import Card from "../card/CardProduct";
import FormBusqueda from "../form/FormBusqueda";
import { Link } from "react-router-dom";
import { useState } from "react";
import Pagination from "../pagination/Pagination";
import { useEffect } from "react";

const Home = () => {
  const [productsF, setProductsF] = useState([]);
  // "useEffect usado para el fect de los productos (por ahora es necesario correr el back de local)"
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/v1/api/products");
        if (response.ok) {
          const data = await response.json();
          console.log(data); //Borrar este console.log, mas tarde\
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

  const herramienasDeAlquiler = [
    {
      id: 1,
      nombre: "Martillo",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 2,
      nombre: "Taladro",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 3,
      nombre: "Tornillo",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 4,
      nombre: "Pala",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 5,
      nombre: "Retroescabadora",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 6,
      nombre: "Cortadora",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 7,
      nombre: "Maderas",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 8,
      nombre: "Fierros",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 9,
      nombre: "Grua",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 10,
      nombre: "Soldadora",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 11,
      nombre: "Cortadora",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 12,
      nombre: "Maderas",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 13,
      nombre: "Fierros",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 14,
      nombre: "Grua",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 15,
      nombre: "Soldadora",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
  ];

  //-------------- CONFIGURACION DE LA PAGINACION -------------------->
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const lastPostIndex = currentPage * itemsPerPage;
  const fistPostIndex = lastPostIndex - itemsPerPage;
  const currentPost = herramienasDeAlquiler.slice(fistPostIndex, lastPostIndex);

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

  const shuffledHerramientas = shuffleArray(herramienasDeAlquiler); //herramienta para hacer aleatoria la forma en que se renderizan las cards

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
          {shuffledHerramientas &&
            currentPost.map((card) => (
              <Grid key={card.id} item xs={6} md={6} className={styles.card}>
                <Link to={"/product/" + card.id} key={card.id}>
                  <Card
                    id={card.id}
                    nombre={card.nombre}
                    descripcion={card.descripcion}
                  />
                </Link>
              </Grid>
            ))}
          <Pagination
            totalPosts={herramienasDeAlquiler.length}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </Grid>
      </div>
    </section>
  );
};

export default Home;
