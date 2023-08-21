import { Grid, Pagination } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../card/CardProduct";

const ListProducts = ({products}) =>{
      //-------------- CONFIGURACION DE LA PAGINACION -------------------->
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const lastPostIndex = currentPage * itemsPerPage;
  const fistPostIndex = lastPostIndex - itemsPerPage;
  const currentPost = products.slice(fistPostIndex, lastPostIndex);

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

  const shuffledHerramientas = shuffleArray(products); //herramienta para hacer aleatoria la forma en que se renderizan las cards

    return (
        <Grid container justifyContent="center" alignItems="center">
        {shuffledHerramientas &&
          currentPost.map((product) => (
            <Grid key={product.id} item xs={6} md={6}>
              <Link to={"/product/" + product.id} key={product.id}>
                <Card
                  product={product}
                />
              </Link>
            </Grid>
          ))}
        <Pagination
          totalPosts={products.length}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </Grid>
    )
};
export default ListProducts;