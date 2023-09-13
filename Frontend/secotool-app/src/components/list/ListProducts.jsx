import { Grid } from "@mui/material";
import { useState } from "react";
import Card from "../card/cardProduct/CardProduct";
import style from "./ListProducts.module.css";
import Pagination from "../pagination/Pagination";

const ListProducts = ({ products }) => {
  //-------------- CONFIGURACION DE LA PAGINACION -------------------->
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const lastPostIndex = currentPage * itemsPerPage;
  const fistPostIndex = lastPostIndex - itemsPerPage;
  const currentPost = products.slice(fistPostIndex, lastPostIndex);


  return (
    <div className={`d-flex f-dir-colum ${style.contenedorLista}`}>
      <div className={style.listProducts}>
        {
          /*shuffledHerramientas &&
          currentPost*/
          currentPost.map((product) => (
            <Grid
              className={style.mapCards}
              container
              key={product.id ? product.id : product.productDto.id}
            >
              <Card
                product={product.productDto ? product.productDto : product}
                style={{ width: "100%" }}
                categoria={product.productCategories}
              />
            </Grid>
          ))
        }
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
