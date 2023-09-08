import { Grid } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "../cardProduct/CardProduct.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

function CardProduct({ product }) {
  console.log(product)
  const { isLoggedIn, token } = useAuth();
  const [isLiked, setIsLiked] = useState(product.isFavorite);

  const url = `http://localhost:8080/v1/api/users/products/${product.id}`;

  //--------------- aca solicito el estado del isliked a la base de dato ---------------


  // ------------- aca hacemos el post del favorite a la base de datos -------------------------

  const dispatchFavorite = async () => {
    try {
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 200) {
        console.log("entro en el ok", response);
      }
    } catch (error) {
      console.error("entro en el error ", error);
    }
  };

  // ------------- aca hacemos el delete del favorito a la base de datos -------------------------

  const dispatchNoFavorite = async () => {
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 200) {
        console.log("entro en el ok", response);
      }
    } catch (error) {
      console.error("entro en el error de sacar favoritos ", error);
    }
  };

  // ----------- effect para renderizar el componenete completo --------------

  //-------- funcion que se ejecuta al hacer click en el corazon -------------

  const handleLike = (product) => {
    console.log("estoy en el producto ", product.name);
    setIsLiked(!isLiked);
    if (!isLiked) {
      dispatchFavorite();
    } else {
      dispatchNoFavorite();
    }
  };

  //----------------------------------------------------------------

  return (
    <div className={styles.contenedorGeneral}>
      {isLoggedIn ? (
        <Grid className={styles.contenedorCorazon} item xs={12} md={12}>
          <FavoriteIcon
            className={styles.corazon}
            color={isLiked ? "error" : "disabled"}
            onClick={() => {
              handleLike(product);
            }}
          />
        </Grid>
      ) : null}

      <Link to={"/product/" + product.id} key={product.id}>
        <Grid container className={styles.container} xs={12} md={12}>
          <Grid container className={styles.card}>
            {/* Contenedor de imagen */}
            <Grid item xs={10} md={6} className={styles.imgContainer}>
              <img className={styles.img} src={product.images[0].url} alt="" />
            </Grid>
            {/* Contenedor de texto */}
            <Grid container className={styles.textoCard} item xs={12} md={6}>
              <Grid item xs={12} md={12}>
                <h4 className={styles.titleCard}>{product.name}</h4>
              </Grid>
              <Grid item xs={12} md={12} className={styles.textPriceCard}>
                <span>$</span>
                <span>{product.price}</span>
              </Grid>
              <div className={styles.boxScore}>
                <span>{product.averageScore}</span>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Link>
    </div>
  );
}
export default CardProduct;
