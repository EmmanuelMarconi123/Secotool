import { Grid, Typography } from "@mui/material";
import styles from "../routes/home.module.css";
import Card from "../card/CardProduct";
import FormBusqueda from "../form/FormBusqueda";
import { Link } from "react-router-dom";

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
  ];

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
          ¿Qué estas buscando?
        </Typography>
        <FormBusqueda />
      </div>
      <div className={styles.contenedorCards}>
        <Grid container>
          {shuffledHerramientas.map((card) => (
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
        </Grid>
      </div>
    </section>
  );
};

export default Home;
