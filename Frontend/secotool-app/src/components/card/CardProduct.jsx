import { Grid } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "../card/CardProduct.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

function CardProduct({ product }) {
  const { isLoggedIn } = useAuth();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const dispatchFavorite = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8080/v1/api/users/products/${product.id}`,
          {
            token: localStorage.getItem("tokenUserLog"),
          }
        );

        if (response.status === 200) {
          console.log("entro en el ok", response);
        }
      } catch (error) {
        console.error("entro en el error ", error);
      }
    };

    if (isLiked) {
      dispatchFavorite();
    }
  }, [isLiked, product.id]);

  const handleLike = (product) => {
    console.log("estoy en el producto ", product.name);
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

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
              <Grid xs={12} md={12} className={styles.textPriceCard}>
                <span>$</span>
                <span>{product.price}</span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Link>
    </div>
  );
}
export default CardProduct;
