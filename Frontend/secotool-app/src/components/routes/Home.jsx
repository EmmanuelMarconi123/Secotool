import { Grid, Typography } from "@mui/material";
import styles from "../routes/home.module.css";
import Card from "../card/CardProduct";
import FormBusqueda from "../form/FormBusqueda";
import { Link } from "react-router-dom";
import { useState } from "react";
import Pagination from "../pagination/Pagination";

const Home = () => {
  const herramienasDeAlquiler = [
    {
      id: 1,
      nombre: "martillo",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 2,
      nombre: "taladro",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 3,
      nombre: "tornillo",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 4,
      nombre: "pala",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 5,
      nombre: "retroescabadora",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 6,
      nombre: "cortadora",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 7,
      nombre: "maderas",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 8,
      nombre: "fierros",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 9,
      nombre: "grua",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 10,
      nombre: "soldadora",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 11,
      nombre: "cortadora",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 12,
      nombre: "maderas",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 13,
      nombre: "fierros",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 14,
      nombre: "grua",
      descripcion: "lakjslkajsdlkj alskhalksdj",
    },
    {
      id: 15,
      nombre: "soldadora",
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
      <div className={styles.container}>
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
