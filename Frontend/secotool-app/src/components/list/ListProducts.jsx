import { Grid} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../card/CardProduct";
import style from "./ListProducts.module.css";
import Pagination from "../pagination/Pagination";

const ListProducts = ({ products }) => {
  //-------------- CONFIGURACION DE LA PAGINACION -------------------->
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
 // const lastPostIndex = currentPage * itemsPerPage;
 // const fistPostIndex = lastPostIndex - itemsPerPage;
 // const currentPost = products.slice(fistPostIndex, lastPostIndex);

  // Función para barajar un array utilizando el algoritmo de Fisher-Yates
  /*function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }*/

  //const shuffledHerramientas = shuffleArray(products); //herramienta para hacer aleatoria la forma en que se renderizan las cards

  return (
    <div className="d-flex f-dir-colum">
      <div className={style.listProducts}>
        {/*shuffledHerramientas &&
          currentPost*/
          products.map((product) => (
            <Grid key={product.id}>
              <Link to={"/product/" + product.id} key={product.id}>
                <Card product={product} />
              </Link>
            </Grid>
          ))}
      </div>
      <Pagination
        totalPosts={products.length}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        className={style.paginationList}
      />
    </div>
  );
};
export default ListProducts;
